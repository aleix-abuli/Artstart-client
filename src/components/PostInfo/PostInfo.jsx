import { Link } from 'react-router-dom';
import LikeButton from '../LikeButton/LikeButton';
import FollowButton from '../FollowButton/FollowButton';

export default function PostInfo(props) {

    const { post } = props;
    const { owner, description } = post;

    return(
        <>
            <div>
                <Link to={`/users/${owner._id}`} >
                    <img src={owner.imageUrl} />
                    <h2>{owner.username}</h2>
                </Link>
                <LikeButton post={post} />
                <FollowButton />
            </div>
            <p>{description}</p>
        </>
    );
};