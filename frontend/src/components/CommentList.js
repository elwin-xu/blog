import React from 'react';

const CommentList = ({ comments }) => (
    <>
        {comments.map((comment, key) => (
            <div className="comment" key={key}>
                <h4>{comment.username}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
    </>
)

export default CommentList;