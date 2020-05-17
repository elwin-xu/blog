import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton'

class PostCard extends Component {
    render() {
        return (
            <div>
                {this.props.posts.map((post, key) => (
                    <div className="uk-card uk-card-default uk-card-hover uk-grid-collapse uk-child-width-1-2@s uk-margin-medium" data-uk-grid key={key}>
                        <div className="uk-card-media-left uk-cover-container">
                            <Link className="article-list-item" key={key} to={`/articles/${post.slugified}`}>
                                <img src={post.cover} alt="" data-uk-cover />
                                <canvas width="600" height="450"></canvas>
                            </Link>
                        </div>
                        <div>
                            <div className="uk-card-body">
                                <div style={{ "display": "flex" }}>
                                    <span>{new Date(post.date).toLocaleDateString()}</span>
                                    <ul className="uk-iconnav" style={{ "marginLeft": "auto" }}>
                                        <li key="heart"><LikeButton article={post} /></li>
                                        <li key="comment">
                                        <span>
                                            <Link
                                                to={`/articles/${post.slugified}#comment-section`}
                                                className="uk-margin-small-left"
                                            >
                                                <button uk-icon="icon: comment" style={{ outline: "none", color: "black"  }} />
                                            </Link>
                                            <span className="uk-margin-small-left">{post.commentCount}</span>
                                        </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="uk-margin">
                                    <Link className="article-list-item" key={key} to={`/articles/${post.slugified}`}>
                                        <h2 className="uk-card-title">{post.title}</h2>
                                        <p>{post.description}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default PostCard;