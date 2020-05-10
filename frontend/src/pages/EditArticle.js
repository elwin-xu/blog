import React, { Component } from 'react';
import slugify from 'slugify';
import { withRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

class EditArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            content: '',
            loading: true,
            slugified: ''
        }
    }

    cancel(e) {
        e.preventDefault();
        this.props.history.push(`/articles/${this.state.slugified}`);
    }

    async submit(e) {
        e.preventDefault()

        if (this.state.title === '' ||
            this.state.description === '' ||
            this.state.content === '') {
            alert('Please fill in all the blanks...')
            return
        }

        await fetch(`/api/articles/edit/${this.state.slugified}`, {
            method: "PUT",
            body: JSON.stringify({
                title: this.state.title,
                slugified: slugify(this.state.title),
                description: this.state.description,
                content: this.state.content
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        this.props.history.push(`/articles/${slugify(this.state.title)}`);
        // this.setState({
        //     title: '',
        //     description: '',
        //     content: '',
        // })
    }

    async componentDidMount() {
        const name = this.props.match.params.name
        const res = await fetch(`/api/articles/${name}`)
        const article = await res.json()
        if (article == null){
            this.setState({loading: false})
        }
        else{
            this.setState({
                title: article.title,
                slugified: article.slugified,
                description: article.description,
                content: article.content,
                loading: false
            })
        }
        
    }

    render() {
        // Check if fetching is finished
        if (this.state.loading === true) return (<div></div>)
        
        // Check if found the article
        if (this.state.slugified === '') return <NotFoundPage />

        return (
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    <form className="uk-form-stacked">
                        <legend className="uk-legend">Edit Article</legend>

                        <label className="uk-form-label uk-margin" for="form-stacked-title">Title:</label>
                        <div className="uk-form-controls">
                            <input
                                className="uk-input"
                                id="form-stacked-title"
                                type="text"
                                value={this.state.title}
                                onChange={(event) => this.setState({ title: event.target.value })} />
                        </div>

                        <label className="uk-form-label uk-margin" for="form-stacked-description">Description:</label>
                        <div className="uk-form-controls">
                            <textarea
                                className="uk-textarea"
                                id="form-stacked-description"
                                rows="4"
                                cols="50"
                                value={this.state.description}
                                onChange={(event) => this.setState({ description: event.target.value })}
                            />
                        </div>

                        <label className="uk-form-label uk-margin" for="form-stacked-content">Content:</label>
                        <div className="uk-form-controls">
                            <textarea
                                className="uk-textarea"
                                id="form-stacked-content"
                                rows="6"
                                cols="50"
                                value={this.state.content}
                                onChange={(event) => this.setState({ content: event.target.value })}
                            />
                        </div>
                        <div className="uk-margin">
                            <button className="uk-button uk-button-default uk-margin-right" onClick={(e) => { this.cancel(e) }}>Cancel</button>
                            <button className="uk-button uk-button-primary" onClick={(e) => { this.submit(e) }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(EditArticle);