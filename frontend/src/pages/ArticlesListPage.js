import React from 'react';
import ArticlesList from '../components/ArticlesList';
import articleContent from './article-content';
import PostCard from '../components/PostCard';

const ArticlesListPage = () => (
    <div className="uk-section">
    <div className="uk-container uk-container-small">
        <PostCard posts={articleContent} />
    </div>
    </div>
);

export default ArticlesListPage;