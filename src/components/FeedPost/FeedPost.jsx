import PostInfo from '../PostInfo/PostInfo'

export default function FeedPost({ post }) {
    return(
        <>
            {post.imageArray.map((image) => (
                <img src={image} />
            ))}
            <PostInfo owner={post.owner} description={post.description} />
        </>
    );
};