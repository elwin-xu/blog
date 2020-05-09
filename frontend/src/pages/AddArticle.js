import React, { Component } from 'react';
import slugify from 'slugify';
import { withRouter } from 'react-router-dom';

class AddArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            content: '',
            date: Date.now()
        }
    }

    async submit(e) {
        e.preventDefault()

        if (this.state.title === '' ||
            this.state.description === '' ||
            this.state.content === '') {
            alert('Please fill in all the blanks...')
            return
        }

        await fetch(`/api/articles/add`, {
            method: "POST",
            body: JSON.stringify({
                title: this.state.title,
                slugified: slugify(this.state.title),
                description: this.state.description,
                content: this.state.content,
                date: new Date()
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

    render() {
        console.log('rendered');
        return (
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    <form className="uk-form-stacked">
                        <legend className="uk-legend">Add Article</legend>

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
                            <button className="uk-button uk-button-primary" onClick={(e) => { this.submit(e) }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(AddArticle);