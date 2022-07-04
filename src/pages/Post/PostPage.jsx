import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostDetails from "../../components/PostDetails/PostDetails";
import CommentList from "../../components/CommentList/CommentList";

const api = process.env.REACT_APP_API_URL;

export default function PostPage() {

    const storedToken = localStorage.getItem('authToken');

    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {

        axios
        .get(`${api}/api/posts/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setPost(data);
            setComments(data.comments);
        })
        .catch((err) => console.log(err));

    }, [])

    return (
        <>
            {post && comments ?
                <>
                    <PostDetails post={post} />
                    <CommentList comments={comments} post={post._id} setComments={setComments} />
                </>
            :
                <>
                    <p>Something went wrong.</p>
                </>
            }
        </>
    );
};