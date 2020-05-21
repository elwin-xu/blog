import React, { Component } from 'react';
import AddCommentForm from './AddCommentForm';
import UIkit from 'uikit';

class CommentSingle extends Component {
    constructor(props) {
        super(props);

        this.toggle = React.createRef();
        this.uuid = window.localStorage.getItem("uuid");
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            likeCount: this.props.comment.likeCount,
            liked: this.props.comment.likes.includes(this.uuid)
        }
    }

    onSubmit(comments) {
        this.props.onSubmit(comments)
        this.toggle.current.click();
    }

    handleClickLike = function () {
        this.setState({
            liked: !this.state.liked,
            likeCount: this.state.liked ? this.state.likeCount - 1 : this.state.likeCount + 1
        });

        const path = `/api/articles/${this.props.slugified}/` + (this.state.liked ? 'dislike' : 'like') + "-comment";

        fetch(path, {
            method: "POST",
            body: JSON.stringify({
                uuid: this.uuid,
                replyID: this.props.comment._id,
                baseCommentID: this.props.baseCommentID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        // fetch(path, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         uuid: this.uuid
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // });
    }

    onDelete(slugified, baseCommentID, comment) {
        const refreshHandler = this.props.onSubmit;
        UIkit.modal.confirm('Are you sure to delete the comment?').then(
            function () {
                if (comment._id !== baseCommentID) {
                    fetch(`/api/articles/${slugified}/delete-reply`, {
                        method: "POST",
                        body: JSON.stringify({
                            replyID: comment._id,
                            baseCommentID: baseCommentID
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(
                        res => res.json()
                    ).then(
                        comments => refreshHandler(comments)
                    )
                }
                else {
                    fetch(`/api/articles/${slugified}/delete-comment`, {
                        method: "POST",
                        body: JSON.stringify({
                            baseCommentID: baseCommentID
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(
                        res => res.json()
                    ).then(
                        comments => refreshHandler(comments)
                    )
                }

            }
        );

    }

    render() {
        const className = this.state.liked ? 'like-button-liked' : '';
        const replyToggleName = `target: #id${this.props.comment._id}; animation: uk-animation-fade`;
        return (
            <article className="uk-comment uk-visible-toggle" tabIndex="-1">
                <header className="uk-comment-header uk-position-relative uk-margin-remove">
                    <div className="uk-grid-medium uk-flex-middle">
                        <div className="uk-width-expand">
                            <h4 className="uk-comment-title uk-margin-remove">
                                <span className="uk-link-reset">{this.props.comment.name}{this.props.comment.replyTo != null ? <span> &#x25B8; {this.props.comment.replyTo}</span> : ''}</span></h4>
                            <p className="uk-comment-meta uk-margin-remove"><span className="uk-link-reset">{new Date(this.props.comment.date).toLocaleString()}</span></p>
                        </div>
                    </div>
                </header>
                <div className="uk-comment-body uk-margin-small">
                    {this.props.comment.content.split("\n").map((para, index) => {
                        return <p key={index}>{para}</p>
                    })}
                </div>
                <div>
                    <button 
                    className={className}
                    uk-icon="icon: heart" 
                    onClick={() => { this.handleClickLike() }}
                    style={{ outline: "none" }} />
                    <span className="uk-margin-small-left">{this.state.likeCount}</span>
                    {/* <span className="uk-margin-small-left">{this.props.comment.likeCount}</span> */}


                    <button uk-toggle={replyToggleName} ref={this.toggle} type="button" className="uk-margin-left" uk-icon="icon: reply" style={{ outline: "none" }} />
                    {this.props.comment.uuid === this.uuid ? <button className="uk-margin-left " uk-icon="icon: trash" style={{ outline: "none" }} onClick={() => { this.onDelete(this.props.slugified, this.props.baseCommentID, this.props.comment) }} /> : null}
                    <AddCommentForm baseCommentID={this.props.baseCommentID} comment={this.props.comment} slugified={this.props.slugified} onSubmit={this.onSubmit} />
                </div>
            </article>
        )
    }
}



export default CommentSingle;