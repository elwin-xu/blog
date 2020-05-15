import React, { Component } from 'react';

class CommentSection extends Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
    }

    adjustHeight() {
        const node = this.textarea.current;
        node.style.height = ""
        node.style.height = (node.scrollHeight + 2) + "px";
    }

    render() {
        return (
            <div className="comment-section">

                <form class="needs-validation" noValidate>
                    <div className="form-group">
                        <input
                            required
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name" />
                        <div className="invalid-feedback">
                            Please enter a valid name.
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea
                            required
                            type="text"
                            name="comment"
                            ref={this.textarea}
                            className="form-control"
                            onInput={() => { this.adjustHeight() }}
                            placeholder="Please enter your comment ..." />
                        <div className="invalid-feedback">
                            Please enter a valid comment.
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                {/* <input className="uk-input" name="name" placeholder="Name" />
                <textarea 
                    className="uk-margin uk-textarea" 
                    ref={this.textarea} 
                    placeholder="Please enter your comment" 
                    name="comment"
                    onInput={()=>{this.adjustHeight()}}
                />
                <button className="uk-button uk-button-primary">Submit</button> */}

                <hr />


                <ul class="uk-comment-list">
                    <li>
                        <article class="uk-comment uk-visible-toggle" tabindex="-1">
                            <header class="uk-comment-header uk-position-relative uk-margin-remove">
                                <div class="uk-grid-medium uk-flex-middle">
                                    <div class="uk-width-expand">
                                        <h4 class="uk-comment-title uk-margin-remove"><span class="uk-link-reset">James</span></h4>
                                        <p class="uk-comment-meta uk-margin-remove"><span class="uk-link-reset">12 days ago</span></p>
                                    </div>
                                </div>
                            </header>
                            <div class="uk-comment-body uk-margin-small">
                                <p>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles.</p>
                            </div>
                        </article>
                        <ul>
                            <li>
                                <article class="uk-comment uk-visible-toggle" tabindex="-1">
                                    <header class="uk-comment-header uk-position-relative uk-margin-remove">
                                        <div class="uk-grid-medium uk-flex-middle">
                                            <div class="uk-width-expand">
                                                <h4 class="uk-comment-title uk-margin-remove"><span class="uk-link-reset">James</span></h4>
                                                <p class="uk-comment-meta uk-margin-remove"><span class="uk-link-reset">12 days ago</span></p>
                                            </div>
                                        </div>
                                    </header>
                                    <div class="uk-comment-body uk-margin-small">
                                        <p>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles.</p>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="uk-comment uk-visible-toggle" tabindex="-1">
                                    <header class="uk-comment-header uk-position-relative uk-margin-remove">
                                        <div class="uk-grid-medium uk-flex-middle">
                                            <div class="uk-width-expand">
                                                <h4 class="uk-comment-title uk-margin-remove"><span class="uk-link-reset">James</span></h4>
                                                <p class="uk-comment-meta uk-margin-remove"><span class="uk-link-reset">12 days ago</span></p>
                                            </div>
                                        </div>
                                    </header>
                                    <div class="uk-comment-body uk-margin-small">
                                        <p>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles.</p>
                                    </div>
                                </article>

                            </li>
                        </ul>
                    </li>
                    <li>
                    <article class="uk-comment uk-visible-toggle" tabindex="-1">
                                    <header class="uk-comment-header uk-position-relative uk-margin-remove">
                                        <div class="uk-grid-medium uk-flex-middle">
                                            <div class="uk-width-expand">
                                                <h4 class="uk-comment-title uk-margin-remove"><span class="uk-link-reset">James</span></h4>
                                                <p class="uk-comment-meta uk-margin-remove"><span class="uk-link-reset">12 days ago</span></p>
                                            </div>
                                        </div>
                                    </header>
                                    <div class="uk-comment-body uk-margin-small">
                                        <p>The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles.</p>
                                    </div>
                                </article>

                    </li>
                </ul>





            </div>
        )
    }
}



export default CommentSection;