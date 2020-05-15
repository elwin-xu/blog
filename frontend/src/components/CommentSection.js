import React, { Component } from 'react';
import CommentSingle from './CommentSingle';


class CommentSection extends Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.state = {
            validated: false
        }
    }

    adjustHeight() {
        const node = this.textarea.current;
        node.style.height = ""
        node.style.height = (node.scrollHeight + 2) + "px";
    }

    handleSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({validated: true});
    }

    render() {
        const className = "needs-validation" + (this.state.validated ? ' was-validated' : '');
        return (
            <div className="comment-section">

                <form className={className} noValidate onSubmit={(e) => this.handleSubmit(e)}>
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


                <ul className="uk-comment-list">
                    {this.props.comments.map((comment) => {
                        return (
                            <li key={comment['_id']}>
                                <CommentSingle comment={comment} />
                                <ul>
                                    {comment.replies.map((reply) => {
                                        return <li key={reply['_id']}>{<CommentSingle comment={reply} />}</li>
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>



            </div>
        )
    }
}



export default CommentSection;