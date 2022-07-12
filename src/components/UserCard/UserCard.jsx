import { Link } from "react-router-dom";
import FollowButton from "../FollowButton/FollowButton";

export default function UserCard(props) {

    const { user } = props;

    return(
        <>
        <Link to={`/users/${user._id}`}>
            <p>{user.username}</p>
        </Link>
        <FollowButton otherUser={user} />

        </>
    );
};