import React, { Component } from 'react';
import slugify from 'slugify';


class AddArticle extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            title: '',
            description: '',
            content:'',
            date:Date.now()
        }
    }

    submit = async () => {
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

        // setArticleInfo(body);
        // setUsername("");
        // setCommentText("");
    }

    render() {
        return (
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    <form className="uk-form-stacked">
                        <legend class="uk-legend">Add Article</legend>

                        <label className="uk-form-label uk-margin" for="form-stacked-title">Title:</label>
                        <div className="uk-form-controls">
                            <input 
                                className="uk-input" 
                                id="form-stacked-title" 
                                type="text" 
                                onChange={(event) => this.setState({title: event.target.value})} />
                        </div>

                        <label className="uk-form-label uk-margin" for="form-stacked-description">Description:</label>
                        <div className="uk-form-controls">
                            <textarea 
                                className="uk-textarea" 
                                id="form-stacked-description" 
                                rows="4" 
                                cols="50" 
                                onChange={(event) => this.setState({description: event.target.value})}
                            />
                        </div>

                        <label className="uk-form-label uk-margin" for="form-stacked-content">Content:</label>
                        <div className="uk-form-controls">
                            <textarea 
                                className="uk-textarea" 
                                id="form-stacked-content" 
                                rows="6" 
                                cols="50" 
                                onChange={(event) => this.setState({content: event.target.value})}
                            />
                        </div>
                        <div className="uk-margin">
                            <button className="uk-button uk-button-primary" onClick={() => this.submit()}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddArticle;