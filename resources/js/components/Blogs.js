import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Query} from "react-apollo";
import gql from 'graphql-tag';
import moment from "moment";
import {NavLink} from "react-router-dom";

const Post = (props) => (
    <div key={props.id} className="postObject">
        <NavLink to={`/blog/${props.id}`}>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
            <p>{moment(props.created_at).format('MMM Do YYYY, h:mm:ss a')}</p>
        </NavLink>
    </div>
);

class Blogs extends Component {
    render(){
        return (
            <div className="container lg ml-auto mr-auto">
            <Query query={gql`
        {
            blogs(orderBy:[{
                field: "created_at"
                order: DESC
            }] count:10 page:1){
                data {
                    id,
                    title,
                    body,
                    created_at
                }
            }
        }
    `}
        >{({loading, error, data}) => {
            if (loading) return '';
            if (error) return <p>Error :(</p>;
            return (
                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}
                                         transitionEnter={false} transitionLeave={false}>
                    {
                        data.blogs.data.map(({id, title, body, created_at}) => (
                            <Post key={id} id={id} title={title} body={body} created_at={created_at}/>
                        ))
                    }
                </ReactCSSTransitionGroup>
            )
        }}
        </Query>
            </div>
        );
    }
}

export default Blogs;