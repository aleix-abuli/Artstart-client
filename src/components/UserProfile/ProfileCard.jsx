export default function ProfileCard(props) {

    const { user } = props;
    const { imageUrl, username, location, description, following } = user;

    return(
        <>
            <img src={imageUrl} />
            <h1>{username}</h1>
            <p>📍{location}</p>
            {description && <p>{description}</p>}
            <p>Following {following.length} users</p>
        </>
    );
};