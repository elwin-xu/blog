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
import CommentSection from '../components/CommentSection';
import UIkit from 'uikit';

class ArticlePage extends Component {
    constructor(props) {
        super(props);
        this.uuid = window.localStorage.getItem('uuid');
        this.state = {
            article: null,
            loading: true,
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

        //, ()=>{
            // if (document.URL.includes("#comment-section")) {
            //     // Scroll to a certain element
            //         const element = document.querySelector('#comment-section');
            //         const y = element.getBoundingClientRect().top + window.pageYOffset;
    
            //         window.scrollTo({ top: y, behavior: 'smooth' });
            // }
        //}
    }

    componentDidUpdate() {
        if (window.location.href.includes("#comment-section")){
            UIkit.scroll().scrollTo("#comment-section");
            // window.location.href = window.location.href.replace("#comment-section","")
            // window.history.pushState("object or string", "Title", window.location.href.replace("#comment-section",""));
        }
    }

    render() {
        // Check if fetching is finished
        if (this.state.loading === true) return (
            <div
                className="d-flex justify-content-center"
                style={{ height: "80vh", alignItems: "center" }}
            >
                <div className="spinner-border" role="status" style={{ height: "20vh", width: "20vh" }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

        // Check if found the article
        if (this.state.article == null) return <NotFoundPage />;
        
        return (
            <div className="uk-section">
                <div className="uk-container uk-container-xsmall" >
                    <article className="uk-article">

                        <h1>{this.state.article.title}</h1>
                        <div className="uk-margin">
                            <LikeButton article={this.state.article} />
                            <span>
                                <a
                                    href="#comment-section"
                                    data-uk-scroll
                                    className="uk-margin-left"
                                    style={{ color: "black" }}
                                >
                                    <button uk-icon="icon: comment" style={{ outline: "none" }} />
                                </a>
                                <span className="uk-margin-small-left">{this.state.article.commentCount}</span>
                            </span>
                        </div>
                        <img data-src={this.state.article.cover} width="750" height="400" alt="cover" uk-img=""></img>
                        <ReactMarkdown source={this.state.article.content} renderers={{ code: CodeBlock }} />
                        <CommentSection slugified={this.state.article.slugified} comments={this.state.article.comments} />
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