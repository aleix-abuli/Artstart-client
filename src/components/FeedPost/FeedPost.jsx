import { Link } from 'react-router-dom';
import PostInfo from '../PostInfo/PostInfo'
import TagCarousel from '../TagCarousel/TagCarousel';

export default function FeedPost(props) {

    const { post } = props;

    return(
        <>
            <Link to={`/posts/${post._id}`}>
                {post.imageArray.map((image, index) => (
                    <img src={image} key={index} />
                ))}
            </Link>
            <PostInfo post={post} />
            <TagCarousel tags={post.genres} />
        </>
    );
};