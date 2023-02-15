import { Link } from 'react-router-dom';
import PostInfo from '../PostInfo/PostInfo'
import TagCarousel from '../TagCarousel/TagCarousel';
import FeedButtons from './FeedButtons';

export default function FeedPost(props) {

    const { post, posts, index, setIndex } = props;

    return(
        <>
            <Link to={`/posts/${post._id}`}>
                {post.imageArray.map((image, index) => (
                    <img src={image} key={index} className='feed-post-img'/>
                ))}
            </Link>
            <FeedButtons posts={posts} index={index} setIndex={setIndex} />
            <PostInfo post={post} />
            <TagCarousel tags={post.genres} />
        </>
    );
};