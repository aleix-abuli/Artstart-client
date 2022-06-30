import { useEffect } from "react";
import { useState } from "react";

export default function PostGridPost(props) {
    
    const { post } = props;
    
    const [postImage, setPostImage] = useState(post.imageArray[0]);

    return(
        <img src={postImage} />
    );
};