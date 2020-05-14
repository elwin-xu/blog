import React, { Component } from 'react';

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.uuid = window.localStorage.getItem("uuid");
        this.state = {
            likeCount: 0,
            liked: false,
            likes: []
        }
    }

    async componentDidMount() {
        this.setState(this.props.article);
        if (this.props.article.likes != null){
            this.setState({ liked: this.props.article.likes.includes(this.uuid) })
        }
    }

    handleClickLike = function () {
        this.setState({
            liked: !this.state.liked,
            likeCount: this.state.liked ? this.state.likeCount - 1 : this.state.likeCount + 1
        });

        const path = `/api/articles/${this.props.article.slugified}/` + (this.state.liked ? 'dislike' : 'like');

        fetch(path, {
            method: "POST",
            body: JSON.stringify({
                uuid: this.uuid
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    render() {
        const className = this.state.liked ? 'like-button-liked' : '';
        return (
            <span className={className}>
                <button
                    uk-icon="icon: heart"
                    onClick={() => { this.handleClickLike() }}
                    style={{ outline: "none" }}
                />
                <span className="uk-margin-small-left">{this.state.likeCount}</span>
            </span>
        );
    }
}

export default LikeButton;