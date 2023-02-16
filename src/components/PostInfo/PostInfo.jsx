import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import SaveButton from '../SaveButton/SaveButton';

export default function PostInfo(props) {

    const { post, feed, fetchPost } = props;
    const { owner, comments, likes, description } = post;

    return(
        <>
            <div className='post-info-div'>
                <Link to={`/users/${owner._id}`} className='post-info-profile'>
                    <div className='post-info-img-container'>
                        <img src={owner.imageUrl} className='post-info-img'/>
                    </div>
                    <p className='bold'>{owner.username}</p>
                </Link>
                <div className='post-info-btn'>
                    <LikeButton post={post} fetchPost={fetchPost}/>
                    <SaveButton post={post} />
                </div>
            </div>
            <div className='post-info-section'>
                <p>{likes.length} likes</p>
            </div>
            {feed ?
            <div className='post-info-section border-top'>
                <p>{comments.length} comments</p>
            </div>
            :
            <div className='post-info-description border-top'>
                <Link to={`/users/${owner.id}`} className='bold'>@{owner.username}</Link>
                <p>{description}</p>
            </div>
            }
        </>
    );
};