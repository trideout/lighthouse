import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Route, Redirect } from "react-router-dom";
const SUBMIT_FORM = gql`
    mutation createBlog($title: String! $body: String!){
        createBlog(title:$title body:$body){
            id
            title
            body
            created_at
        }
    }
`;

class BlogForm extends Component {
    state = {redirectToLatest: false};

    constructor(props) {
        super(props);
        this.state = {title: '', body: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
    }
    render() {
        let inputTitle;
        let inputBody;

        return (
            <Mutation mutation={SUBMIT_FORM} onCompleted={this.handleSubmit()}>
                {(createBlog, {data}) => (
                <form onSubmit={e=> {e.preventDefault();createBlog({
                    variables: {
                        title: inputTitle.value,
                        body: inputBody.value
                    }
                })}} className="w-full max-w-md p-6 m-5">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Title
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input ref={node => {
                                inputTitle = node;
                            }} type="text" value={this.state.title} onChange={this.handleChange} name="title" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Body
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <textarea ref={node => {
                                inputBody = node;
                            }} rows="20" value={this.state.body} onChange={this.handleChange} name="body" className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"/>
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <input type="submit" value="Submit" className="shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"/>
                    </div>
                </form>
                    )}
            </Mutation>
        );

    }
}

export default BlogForm;