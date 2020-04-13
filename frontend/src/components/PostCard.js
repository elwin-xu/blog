import React from 'react';
import { Link } from 'react-router-dom';
import cardImg from '../images/home.png';

const PostCard = ({ posts }) => (
    <>
        {posts.map((post, key) => (
            <div className="uk-card uk-card-default uk-card-hover uk-grid-collapse uk-child-width-1-2@s uk-margin-medium" data-uk-grid>
                <div className="uk-card-media-left uk-cover-container">
                    <Link className="article-list-item" key={key} to={`/article/${post.name}`}>
                        <img src={cardImg} alt="" data-uk-cover />
                        <canvas width="600" height="450"></canvas>
                    </Link>
                </div>
                <div>
                    <div className="uk-card-body">
                        <div style={{ "display": "flex" }}>
                            <span>Mar 2019</span>
                            <ul className="uk-iconnav" style={{ "marginLeft": "auto" }}>
                                <li><a href="#" uk-icon="icon: heart"></a></li>
                                <li><a href="#" uk-icon="icon: comment"></a></li>
                            </ul>
                        </div>
                        <div className="uk-margin">
                        <Link className="article-list-item" key={key} to={`/article/${post.name}`}>
                            <h3 className="uk-card-title">{post.title}</h3>
                            <p>{post.content[0].substring(0, 150)}...</p>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>

        ))}
    </>
);

export default PostCard;