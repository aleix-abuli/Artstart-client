import UserCard from "../UserCard/UserCard";

export default function FollowingList(props) {

    const { followees } = props;

    return(
        <>
            {followees.map((followee) => (
                <UserCard user={followee} key={followee._id} />
            ))}
        </>
    );
};