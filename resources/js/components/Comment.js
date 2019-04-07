import React, { Component } from 'react';

class Comment extends Component {
    render() {
        return (
            <div key={this.props.id} className="commentObject">
                <p>{this.props.body}</p>
                <p>{this.props.commenter}</p>
            </div>
        );
    }
}

export default Comment;