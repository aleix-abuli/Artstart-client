import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import FeedPost from "../../components/FeedPost/FeedPost";
import Loader from "../../components/Loader/Loader";

const api = process.env.REACT_APP_API_URL;

export default function FollowingPage() {

    const storedToken = localStorage.getItem('authToken');

    const { user } = useContext(AuthContext);

    const [posts, setPosts] = useState(null);
    const [index, setIndex] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
        if(user) {
            axios
            .get(`${api}/api/users/following/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => {
                setPosts(data.reverse());
                setIndex(0);
            })
            .catch((err) => console.log(err));
        }
    }, [user]);

    useEffect(() => {
        if(posts && index !== null) setPost(posts[index]);
    }, [posts, index]);

    const goToNext = (e) => {
        e.preventDefault();
        if(index < posts.length-1) setIndex(index + 1);
    };

    const goToPrevious = (e) => {
        e.preventDefault();
        if(index > 0) setIndex(index - 1);
    };

    return (
        <>
            {post?
                <>
                    <FeedPost post={post} />
                    {(index > 0) ?
                        <button onClick={goToPrevious}>previous</button>
                        :
                        <button>fake previous</button>
                    }
                    {(index < posts.length-1) ?
                        <button onClick={goToNext}>next</button>
                        :
                        <button>fake next</button>
                    }
                </>
                :
                <>
                <Loader />
                </>
            }
        </>
    );
};