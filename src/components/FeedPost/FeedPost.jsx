import PostInfo from '../PostInfo/PostInfo'

export default function FeedPost(props) {

    const { post } = props;

    return(
        <>
            {post.imageArray.map((image, index) => (
                <img src={image} key={index} />
            ))}
            <PostInfo post={post} />
        </>
    );
};