import React, { useState } from 'react';

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [username, setUsername] = useState("");
    const [commentText, setCommentText] = useState("");

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                text: commentText
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const body = await result.json();
        setArticleInfo(body);
        setUsername("");
        setCommentText("");
    }

    return (
        <>
        <hr />
        <form className="uk-form-stacked">
            <legend class="uk-legend">Add Comment</legend>
            <label className="uk-form-label uk-margin" for="form-stacked-name">Name:</label>
            <div className="uk-form-controls">
                <input className="uk-input" id="form-stacked-name" type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <label className="uk-form-label uk-margin" for="form-stacked-comment">Comment:</label>
            <div className="uk-form-controls">
                <textarea className="uk-textarea" id="form-stacked-comment" rows="4" cols="50" value={commentText} onChange={(event) => setCommentText(event.target.value)} />
            </div>
            <div className="uk-margin">
                <button className="uk-button uk-button-primary" onClick={() => addComment()}>Submit</button>
            </div>
        </form>
        <hr />
        </>
    );
}

export default AddCommentForm;