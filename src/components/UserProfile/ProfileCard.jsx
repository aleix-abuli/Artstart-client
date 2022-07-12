export default function ProfileCard(props) {

    const { user } = props;
    const { imageUrl, username, name, location, description, following } = user;

    return(
        <>
            <img src={imageUrl} />
            <h1>{username}</h1>
            <h3>{name}</h3>
            <p>📍{location}</p>
            {description && <p>{description}</p>}
            <p>Following {following.length} users</p>
        </>
    );
};