import React, { Component } from 'react';
import Comment from './Comment';

class Comments extends Component {
    render() {
        return (
            <section className="section">
                {
                    this.props.comments.map(comment => {
                        return <Comment id={comment.id} body={comment.body} commenter={comment.commenter}/>
                    })
                }
            </section>
        );
    }
}

export default Comments;