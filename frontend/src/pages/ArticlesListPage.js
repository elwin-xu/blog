import React, { Component } from 'react';
import PostCard from '../components/PostCard';

class ArticlesListPage extends Component {
    constructor(props){
        super(props)
        this.state = { articles: [] }
    }

    async componentWillMount() {
        let res = await fetch('/api/articles')
        let articles = await res.json()
        this.setState({
            articles: articles
        })

        // let res = await fetch('static/posts/000/post.md');
        // let text = await res.text();
        // this.setState({ terms: text });
    }

    render() {
        return (
            <div className="uk-section">
                <div className="uk-container uk-container-small">

                    {/* <ul data-uk-tab uk-switcher="">
                        <li><a href="#">All</a></li>
                        <li><a href="#">React</a></li>
                        <li><a href="#">Git</a></li>
                        <li><a href="#">HTML</a></li>
                    </ul> */}

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