import React, { Component } from 'react';
// import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
// import articleContent from './article-content';
// import CommentList from '../components/CommentList';
// import UpvotesSection from '../components/UpvotesSection';
// import AddCommentForm from '../components/AddCommentForm';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "../components/CodeBlock";
import LikeButton from "../components/LikeButton";

class ArticlePage extends Component {
    constructor(props) {
        super(props);
        this.uuid = window.localStorage.getItem('uuid');
        this.state = {
            article: null,
            loading: true
        }
    }
    // const article = articleContent.find(article => article.name === name);
    async componentDidMount() {
        const res = await fetch(`/api/articles/${this.props.match.params.name}?uuid=${this.uuid}`);
        const article = await res.json();

        this.setState({ 
            article: (article != null) ? article : null,
            loading: false
        });
    }

    render() {
        // Check if fetching is finished
        if (this.state.loading === true) return (<div></div>)

        // Check if found the article
        if (this.state.article == null) return <NotFoundPage />

        return (
            <div className="uk-section">
                <div className="uk-container uk-container-xsmall" >
                    <article className="uk-article">
                        <h1>{this.state.article.title}</h1>
                        <div className="uk-margin">
                            <LikeButton article={this.state.article} />
                        </div>
                        <img data-src={this.state.article.cover} width="750" height="400" alt="cover" uk-img=""></img>
                        <ReactMarkdown source={this.state.article.content} renderers={{ code: CodeBlock }} />
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

}

export default ArticlePage;