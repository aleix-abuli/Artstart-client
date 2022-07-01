import { useEffect } from "react";
import { useState } from "react";

export default function PostGridPost(props) {
    
    const { post } = props;

    return(
        <img src={post.imageArray[0]} />
    );
};