import React, { Component } from 'react';
import PostCard from '../components/PostCard';

class ArticlesListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: true
        }
    }

    async componentDidMount() {
        let res = await fetch('/api/articles')
        let articles = await res.json()
        this.setState({
            articles: articles,
            loading: false
        })

        // let res = await fetch('static/posts/000/post.md');
        // let text = await res.text();
        // this.setState({ terms: text });
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

        return (
            <div className="uk-section">
                <div className="uk-container uk-container-small">



                    <ul className="uk-switcher">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>

                    <PostCard posts={this.state.articles} />
                </div>
            </div>
        )
    }

}

export default ArticlesListPage;