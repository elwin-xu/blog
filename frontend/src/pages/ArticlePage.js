import React, { Component } from 'react';
// import ArticlesList from '../components/ArticlesList';
import NotFoundPage from './NotFoundPage';
// import articleContent from './article-content';
// import CommentList from '../components/CommentList';
// import UpvotesSection from '../components/UpvotesSection';
// import AddCommentForm from '../components/AddCommentForm';
import ReactMarkdown from 'react-markdown';
import CodeBlock from "../components/CodeBlock";

class ArticlePage extends Component {
    constructor(props) {
        super(props);
        this.uuid = window.localStorage.getItem('uuid');
        this.state = {
            title: '',
            slugified: '',
            cover: '',
            content: '',
            likeCount: 0,
            liked: false,
            likes: [],
            loading: true
        }
    }
    // const article = articleContent.find(article => article.name === name);
    async componentDidMount() {
        const res = await fetch(`/api/articles/${this.props.match.params.name}?uuid=${this.uuid}`);

        const article = await res.json();
        if (article != null){
            this.setState(article);
            this.setState({liked : this.state.likes.includes(this.uuid)})
        }
        this.setState({ loading: false });
    }

    //const otherArticles = articleContent.filter(article => article.name !== name);
    handleClickLike = function () {
        this.setState({
            liked: !this.state.liked,
            likeCount: this.state.liked ? this.state.likeCount - 1 : this.state.likeCount + 1
        });

        const path = `/api/articles/${this.state.slugified}/` + (this.state.liked ? 'dislike' : 'like');

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
        // Check if fetching is finished
        if (this.state.loading === true) return (<div></div>)

        // Check if found the article
        if (this.state.slugified === '') return <NotFoundPage />

        const className = this.state.liked ? 'like-button' : '';
        return (
            <div className="uk-section">
                <div className="uk-container uk-container-xsmall" >
                    <article className="uk-article">
                        <h1>{this.state.title}</h1>
                        <div className="uk-margin">
                            <span className={className}>
                                <button
                                    uk-icon="icon: heart"
                                    onClick={() => { this.handleClickLike() }}
                                    style={{ outline: "none" }}
                                />
                                <span className="uk-margin-small-left">{this.state.likeCount}</span>
                            </span>
                        </div>
                        <img data-src={this.state.cover} width="750" height="400" alt="cover" uk-img=""></img>
                        <ReactMarkdown source={this.state.content} renderers={{ code: CodeBlock }} />
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