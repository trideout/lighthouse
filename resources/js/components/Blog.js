import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Query} from "react-apollo";
import gql from 'graphql-tag';
import moment from "moment";

const Post = (props) => (
    <div key={props.id} className="postObject">
        <h3>{props.title}</h3>
        <p>{props.body}</p>
        <p>{moment(props.created_at).format('MMM Do YYYY, h:mm:ss a')}</p>
    </div>
);
const GET_BLOG_ENTRY = gql`
    query Blog($blogId: ID!){
        blog(id: $blogId){
                id,
                title,
                body,
                created_at,
                comments {
                    commenter
                    body
                }
            }
    }`;

class Blog extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.match.params.blogId);
        return (
            <div className="container lg ml-auto mr-auto">
            <Query query={GET_BLOG_ENTRY} variables={{ blogId: this.props.match.params.blogId }} >{({loading, error, data}) => {
            if (loading) return '';
            if (error) return <p>Error :(</p>;
            console.log(data);
            return (
                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}
                                         transitionEnter={false} transitionLeave={false}>
                    <Post id={data.blog.id} title={data.blog.title} body={data.blog.body} created_at={data.blog.created_at}/>
                </ReactCSSTransitionGroup>
            )
        }}
        </Query>
            </div>
        );
    }
}

export default Blog;