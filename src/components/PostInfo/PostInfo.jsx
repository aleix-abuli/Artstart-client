import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import SaveButton from '../SaveButton/SaveButton';

export default function PostInfo(props) {

    const { post } = props;
    const { owner, comments, likes } = post;

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
                    <LikeButton post={post} />
                    <SaveButton post={post} />
                </div>
            </div>
            <div className='post-info-section'>
                <p>{likes.length} likes</p>
            </div>
            <div className='post-info-section border-top'>
                <p>{comments.length} comments</p>
            </div>
        </>
    );
};