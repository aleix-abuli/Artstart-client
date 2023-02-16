import { Link } from 'react-router-dom';
import PostInfo from '../PostInfo/PostInfo'
import TagCarousel from '../TagCarousel/TagCarousel';
import FeedButtons from './FeedButtons';

export default function FeedPost(props) {

    const { post, posts, index, setIndex } = props;

    return(
        <div className='feed-post-container'>
            <div>
                <Link to={`/posts/${post._id}`} className='feed-post-link-flex'>
                    {post.imageArray.map((image, index) => (
                        <img src={image} key={index} className='feed-post-img'/>
                    ))}
                </Link>
                <PostInfo post={post} />
                <TagCarousel tags={post.genres} />
            </div>
            <div className='feed-post-separator'></div>
            <FeedButtons posts={posts} index={index} setIndex={setIndex} />
        </ div>
    );
};