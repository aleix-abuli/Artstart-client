import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PostDetails from "../../components/PostDetails/PostDetails";

const api = process.env.REACT_APP_API_URL;

export default function PostPage() {

    const storedToken = localStorage.getItem('authToken');

    const { id } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {

        axios
        .get(`${api}/api/posts/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => setPost(data))
        .catch((err) => console.log(err));

    }, [])

    return (
        <>
            {post ?
                <>
                    <PostDetails post={post} />
                </>
            :
                <>
                    <p>Something went wrong.</p>
                </>
            }
        </>
    );
};