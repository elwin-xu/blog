import React, { useState, useEffect } from 'react';
// import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
// import articleContent from './article-content';
// import CommentList from '../components/CommentList';
// import UpvotesSection from '../components/UpvotesSection';
// import AddCommentForm from '../components/AddCommentForm';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "../components/CodeBlock";

const ArticlePage = ({ match }) => {
    const name = match.params.name;
    // const article = articleContent.find(article => article.name === name);

    const [article, setArticle] = useState({
        title: '',
        slugified: '',
        content: '',
        date: new Date()
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/articles/${name}`)
            const article = await res.json()
            setArticle(article)
        }
        fetchData();
    }, [name]);

    if (!article) return <NotFoundPage />

    //const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <div className="uk-section">

            <div className="uk-container uk-container-xsmall" >
                <article className="uk-article">
                    <ReactMarkdown source={article.content} renderers={{ code: CodeBlock }} />

                    {/* <h3>Other Articles:</h3> */}
                    {/* <ArticlesList articles={otherArticles} /> */}
                </article>
                {/* <CommentList comments={articleInfo.comments} /> */}
                {/* <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} /> */}
                {/* <button className="uk-button uk-button-link" data-uk-totop data-uk-scroll /> */}
            </div>
        </div>
    );
}

export default ArticlePage;