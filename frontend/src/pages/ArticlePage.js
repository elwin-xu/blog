import React, { useState, useEffect } from 'react';
import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
import articleContent from './article-content';
import CommentList from '../components/CommentList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    if (!article) return <NotFoundPage />

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
    <div className="uk-section">

        <div className="uk-container uk-container-small" >
            <div style={{"border":"1px solid rgba(204,204,204,0.75)", "padding":"40px 40px"}}>
            <article className="uk-article">
                <h1 className="uk-article-title">{article.title}</h1>

                {/* <UpvotesSection name={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} /> */}

                {article.content.map((paragraph, key) => (
                    <p key={key}>{paragraph}</p>
                ))}

                

                {/* <h3>Other Articles:</h3> */}
                {/* <ArticlesList articles={otherArticles} /> */}
            </article>
            </div>
            <CommentList comments={articleInfo.comments} />
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
            {/* <button className="uk-button uk-button-link" data-uk-totop data-uk-scroll /> */}
        </div>
        </div>


    );
}

export default ArticlePage;