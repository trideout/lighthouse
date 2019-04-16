import React, { Component } from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";

const SUBMIT_COMMENT = gql`
    mutation createComment($blogId: ID! $commenter: String! $body: String!){
        createComment(blog_id: $blogId commenter: $commenter body: $body){
            id,
            commenter,
            body
        }
    }
`;
class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {commenter: '', body: '', reloadPage: false};
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
        this.setState({reloadPage: true})
    }
    render () {
        let inputCommenter;
        let inputBody;
        if(this.state.reloadPage){
            return window.location.reload();
        }
        return (
            <Mutation mutation={SUBMIT_COMMENT} onCompleted={this.handleSubmit}>
                {(createComment, {data, called}) => (
                    <form onSubmit={e => {
                        e.preventDefault();
                        createComment({
                            variables: {
                                blogId: this.props.blogId,
                                body: inputBody.value,
                                commenter: inputCommenter.value
                            }
                        });
                    }} className="w-full max-w-md p-6 m-5">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Your Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input ref={node => {
                                    inputCommenter = node;
                                }} type="text" value={this.state.commenter} onChange={this.handleChange} name="commenter"
                                       className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"/>
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
                            }} rows="5" value={this.state.body} onChange={this.handleChange} name="body"
                                      className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"/>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <input type="submit" value="Submit"
                                   className="shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"/>
                        </div>
                    </form>
                )}
            </Mutation>
        );
    }
}

export default CommentForm;