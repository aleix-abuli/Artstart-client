import PostInfo from "../PostInfo/PostInfo";
import TagCarousel from '../TagCarousel/TagCarousel';
import CommentList from '../CommentList/CommentList';

export default function PostDetails(props) {
    
    const { post } = props;
    
    return(
        <>
            {post.imageArray.map((image, index) => (
                <img src={image} key={index} />
            ))}
            <PostInfo post={post} />
            <TagCarousel tags={post.genres} />
            <CommentList comments={post.comments} />
        </>
    );
};