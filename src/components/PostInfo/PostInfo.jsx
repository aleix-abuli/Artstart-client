import LikeButton from '../LikeButton/LikeButton';
import FollowButton from '../FollowButton/FollowButton';

export default function PostInfo({ owner, description}) {
    return(
        <>
            <div>
                <img src={owner.imageUrl} />
                <h2>{owner.username}</h2>
                <LikeButton />
                <FollowButton />
            </div>
            <p>{description}</p>
        </>
    );
};