import React, { Component } from 'react';
import CommentSingle from './CommentSingle';
import AddCommentForm from './AddCommentForm';

class CommentSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(comments) {
        this.setState({ comments: comments })
    }

    render() {
        if (this.state.comments.length === 0) {
            return (
                <div className="comment-section">
                <hr />
                <div className="uk-text-center">
                    Be the first to leave a comment!
                </div>
                <hr />
                <AddCommentForm slugified={this.props.slugified} onSubmit={this.handleSubmit} />
                </div>
            )
        }

        return (
            <div className="comment-section">
                <hr />
                <ul className="uk-comment-list">
                    {this.state.comments.map((comment) => {
                        if (comment.replies.length !== 0) {
                            return (
                                <li key={comment['_id']}>
                                    <CommentSingle baseCommentID={comment._id} comment={comment} slugified={this.props.slugified} onSubmit={this.handleSubmit} />
                                    <ul>
                                        {comment.replies.map((reply) => {
                                            return <li key={reply['_id']}>{<CommentSingle baseCommentID={comment._id} comment={reply} slugified={this.props.slugified} onSubmit={this.handleSubmit} />}</li>
                                        })}
                                    </ul>
                                </li>
                            )
                        }
                        else {
                            return (
                                <li key={comment['_id']}>
                                    <CommentSingle baseCommentID={comment._id} comment={comment} slugified={this.props.slugified} onSubmit={this.handleSubmit} />
                                </li>
                            )
                        }
                    })}
                </ul>
                <hr />
                <AddCommentForm slugified={this.props.slugified} onSubmit={this.handleSubmit} />
            </div>
        )
    }
}



export default CommentSection;