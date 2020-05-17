import React, { Component } from 'react';

class AddCommentForm extends Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.uuid = window.localStorage.getItem("uuid");
        this.state = {
            validated: false,
            name: '',
            comment: '',
            hidden: this.props.comment != null ? true : false
        }
    }

    adjustHeight() {
        const node = this.textarea.current;
        node.style.height = ""
        node.style.height = (node.scrollHeight + 2) + "px";
    }

    handleSubmit(e) {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            // e.preventDefault();
            e.stopPropagation();
            this.setState({ validated: true });
        }
        else {
            if (this.props.comment != null) {
                fetch(`/api/articles/${this.props.slugified}/add-reply`, {
                    method: "POST",
                    body: JSON.stringify({
                        name: this.state.name,
                        comment: this.state.comment,
                        uuid: this.uuid,
                        replyTo: this.props.comment.name,
                        replyToID: this.props.baseCommentID
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then( 
                    res => res.json() 
                ).then(
                    comments => this.props.onSubmit(comments)
                )
            }
            else {
                fetch(`/api/articles/${this.props.slugified}/add-comment`, {
                    method: "POST",
                    body: JSON.stringify({
                        name: this.state.name,
                        comment: this.state.comment,
                        uuid: this.uuid
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then( 
                    res => res.json() 
                ).then(
                    comments => this.props.onSubmit(comments)
                )
            }

            this.setState({ name: "", comment: "", validated: false });
            // this.setState({hidden: true})
        }

    }

    render() {
        const className = "uk-margin-top needs-validation" + (this.state.validated ? ' was-validated' : '');
        const toggleID = this.props.comment != null ? 'id' + this.props.comment._id : ""
        const placeholder = this.props.comment != null ? `Replying to ${this.props.comment.name} ...` : "Please enter your comment ..."
        return (
            <form id={toggleID} hidden={this.state.hidden} className={className} noValidate onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                    <input
                        required
                        type="text"
                        name="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
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
                        value={this.state.comment}
                        onChange={(e) => this.setState({ comment: e.target.value })}
                        placeholder={placeholder} />
                    <div className="invalid-feedback">
                        Please enter a valid comment.
                        </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default AddCommentForm;