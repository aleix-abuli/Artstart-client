import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import FeedPost from "../../components/FeedPost/FeedPost";

const api = process.env.REACT_APP_API_URL;

export default function FollowingPage() {

    const storedToken = localStorage.getItem('authToken');

    const { user } = useContext(AuthContext);

    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if(user) {
            axios
            .get(`${api}/api/users/following/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => setPosts(data.reverse()))
            .catch((err) => console.log(err));
        }
    }, [user]);


    return (
        <>
            {posts ?
                <>
                {posts.map(post => (
                    <FeedPost post={post} key={post._id} />
                ))}
                </>
                :
                <>
                <h2>No posts from db</h2>
                </>
            }
        </>
    );
};