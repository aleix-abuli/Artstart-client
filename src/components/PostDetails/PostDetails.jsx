import PostInfo from "../PostInfo/PostInfo";
import TagCarousel from '../TagCarousel/TagCarousel';
import CommentList from '../CommentList/CommentList';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";

export default function PostDetails(props) {
    
    const { post } = props;

    const { user } = useContext(AuthContext);

    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if(user._id === post.owner) setIsOwner(true);
    }, [user]);
    
    return(
        <>
            {post.imageArray.map((image, index) => (
                <img src={image} key={index} />
            ))}
            {isOwner && <Link to={`/posts/${post._id}/edit`}>Edit</Link>}
            <PostInfo post={post} />
            <TagCarousel tags={post.genres} />
        </>
    );
};