import React from 'react';
import ArticlesList from '../components/ArticlesList';
import articleContent from './article-content';

const ArticlesListPage = () => (
    <div className="uk-container uk-container-small">
    <h1>Articles</h1>
    <ArticlesList articles={articleContent} />
    </div>
);

export default ArticlesListPage;