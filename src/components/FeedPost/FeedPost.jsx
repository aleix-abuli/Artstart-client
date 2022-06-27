import PostInfo from '../PostInfo/PostInfo'

export default function FeedPost({ post }) {
    return(
        <>
            {post.imageArray.map((image, index) => (
                <img src={image} key={index} />
            ))}
            <PostInfo owner={post.owner} description={post.description} />
        </>
    );
};