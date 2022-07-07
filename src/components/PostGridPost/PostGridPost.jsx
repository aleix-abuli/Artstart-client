import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PostGridPost(props) {
    
    const { post } = props;

    return(
        <Link to={`/posts/${post._id}`}>
            <img src={post.imageArray[0]} />
        </Link>
    );
};