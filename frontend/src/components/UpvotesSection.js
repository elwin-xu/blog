import React from 'react';

const UpvotesSection = ({ name, upvotes, setArticleInfo }) => {
    const upvoteArticle = async ()=>{
        const result = await fetch(`blog/api/articles/${name}/upvote`,{
            method: "POST",
        });
        
        const body = await result.json();
        setArticleInfo(body);
    }

    return (
        <div className="upvotes-section">
            <button onClick={()=>{upvoteArticle()}}>Upvote</button>
            <p>This article has been upvoted for {upvotes} times</p>
        </div>
    )
}

export default UpvotesSection;