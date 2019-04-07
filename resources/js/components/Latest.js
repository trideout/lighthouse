import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from 'graphql-tag';
import {ApolloProvider} from "react-apollo";
import ApolloClient from "apollo-boost";
import moment from "moment";
import Comment from "./Comment"

const Post = (props) => (
    <div key={props.id} className="postObject">
        <h3>{props.title}</h3>
        <p>{props.body}</p>
        <p>{moment(props.created_at).format('MMM Do YYYY, h:mm:ss a')}</p>
    </div>
);



class Latest extends Component {
    render() {
        const client = new ApolloClient({
            uri: '/graphql'
        });
        return (
            <ApolloProvider client={client}>
                <div className="container lg ml-auto mr-auto">
                    <Query query={gql`
        {
          latestBlog{
            id
            title
            body
            created_at
            comments{
                id
                 commenter
                 body
            }
          }
        }
    `}
                    >{({loading, error, data}) => {
                        if (loading) return '';
                        if (error) return <p>Error :(</p>;
                        return (
                            <div>
                                <Post id={data.latestBlog.id} title={data.latestBlog.title} body={data.latestBlog.body} created_at={data.latestBlog.created_at} comments={data.latestBlog.comments}/>
                                {
                                    data.latestBlog.comments.map((comment) => {
                                        return <Comment id={comment.id} body={comment.body} commenter={comment.commenter}/>;
                                    })
                                }
                            </div>
                        )
                    }}
                    </Query>
                </div>
            </ApolloProvider>
        );
    }
}

export default Latest;