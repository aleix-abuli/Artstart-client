export default function ProfileCard(props) {

    const { user } = props;

    return(
        <>
            <h1>Hello, {user.username}</h1>
        </>
    );
};