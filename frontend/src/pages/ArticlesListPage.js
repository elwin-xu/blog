import React from 'react';
import articleContent from './article-content';
import PostCard from '../components/PostCard';

const ArticlesListPage = () => (
    <div className="uk-section">
        <div className="uk-container uk-container-small">

            <ul data-uk-tab uk-switcher="">
                <li><a href="#">All</a></li>
                <li><a href="#">React</a></li>
                <li><a href="#">Git</a></li>
                <li><a href="#">HTML</a></li>
            </ul>

            <ul className="uk-switcher">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <PostCard posts={articleContent} />
        </div>
    </div>
);

export default ArticlesListPage;