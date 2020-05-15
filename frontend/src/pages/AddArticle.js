import React, { Component } from 'react';
import slugify from 'slugify';
import { withRouter } from 'react-router-dom';

class AddArticle extends Component {
    constructor(props) {
        super(props)
        this.fileInput = React.createRef();
        this.state = {
            title: '',
            description: '',
            content: ''
        }
    }

    cancel(e) {
        e.preventDefault();
        this.props.history.push(`/articles`);
    }

    async submit(e) {
        e.preventDefault();

        // alert(`${this.fileInput.current.files[0].name}`);

        if (this.state.title === '' ||
            this.state.description === '' ||
            this.state.content === '') {
            alert('Please fill in all the blanks...')
            return
        }

        let formdata = new FormData();
        formdata.append("cover", this.fileInput.current.files[0]);
        formdata.append("title", this.state.title);
        formdata.append("slugified", slugify(this.state.title));
        formdata.append("description", this.state.description);
        formdata.append("content", this.state.content);
        formdata.append("date", new Date());

        await fetch(`/api/articles`, {
            method: "POST",
            body: formdata
        });

        this.props.history.push(`/articles/${slugify(this.state.title)}`);


        // this.setState({
        //     title: '',
        //     description: '',
        //     content: '',
        // })

    }

    render() {
        return (
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    <form className="uk-form-stacked">
                        <legend className="uk-legend">Add Article</legend>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-file">File:</label>
                            <div data-uk-form-custom>
                                <input
                                    required
                                    id="form-stacked-file"
                                    type="file"
                                    name="cover"
                                    ref={this.fileInput}
                                    />
                                <button className="uk-button uk-button-default">Upload</button>
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-title">Title:</label>
                            <div className="uk-form-controls">
                                <input
                                    required
                                    className="uk-input"
                                    id="form-stacked-title"
                                    name="title"
                                    type="text"
                                    value={this.state.title}
                                    onChange={(event) => this.setState({ title: event.target.value })} />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-description">Description:</label>
                            <div className="uk-form-controls">
                                <textarea
                                    className="uk-textarea"
                                    id="form-stacked-description"
                                    name="description"
                                    rows="4"
                                    cols="50"
                                    value={this.state.description}
                                    onChange={(event) => this.setState({ description: event.target.value })}
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label className="uk-form-label" htmlFor="form-stacked-content">Content:</label>
                            <div className="uk-form-controls">
                                <textarea
                                    className="uk-textarea"
                                    id="form-stacked-content"
                                    name="content"
                                    rows="6"
                                    cols="50"
                                    value={this.state.content}
                                    onChange={(event) => this.setState({ content: event.target.value })}
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <button className="uk-button uk-button-default uk-margin-right" onClick={(e) => { this.cancel(e) }}>Cancel</button>
                            <button className="uk-button uk-button-primary" type="submit" onClick={(e) => { this.submit(e) }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(AddArticle);