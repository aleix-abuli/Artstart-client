import axios from "axios";
import { useEffect, useState } from "react";
import FeedPost from "../../components/FeedPost/FeedPost";

const api = process.env.REACT_APP_API_URL;

export default function FeedPage() {

    const[posts, setPosts] = useState(null);

    useEffect(() => {

        axios
        .get(`${api}/api/posts`)
        .then(({ data }) => {
            setPosts(data)})
        .catch(err => console.log(err));

    }, []);

    return (
        <>
            {posts?
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