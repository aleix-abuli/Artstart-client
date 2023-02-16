import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { FeedContext } from "../../context/feed.context";

const api = process.env.REACT_APP_API_URL;

export default function LikeButton(props) {

    const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext);

    const { triggerLike, setTriggerLike } = useContext(FeedContext);

    const { post, fetchPost } = props;

    const [likesPost, setLikesPost] = useState(false);

    useEffect(() => {    
        checkLike();
    }, [post]);

    const checkLike = () => {

        if(user) {

            axios
            .get(`${api}/api/users/${user._id}`)
            .then(({ data }) => {
                if(data.likes.some((like) => like._id === post._id)) setLikesPost(true);
                else setLikesPost(false);
            })
            .catch((err) => console.log(err));

        };

    }

    const handleLike = (e) => {

        e.preventDefault();
        
        axios
        .post(`${api}/api/posts/like/${post._id}`, user, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            checkLike();
            setTriggerLike(triggerLike+1);
            if(fetchPost) fetchPost();
        })
        .catch((err) => console.log('couldn`t access database', err))
    };

    const handleUnlike = (e) => {

        e.preventDefault();

        axios
        .post(`${api}/api/posts/unlike/${post._id}`, user, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            checkLike();
            setTriggerLike(triggerLike+1);
            if(fetchPost) fetchPost();
        })
        .catch((err) => console.log('couldn`t access database', err))
    };

    return(
        <>
            {likesPost ?
            <button onClick={handleUnlike} className='like-btn white-bg outline'><div className="heart"></div></button>
            :
            <button onClick={handleLike} className='like-btn white-bg outline'><div className="heart-gray"></div></button>}
        </>
    );
};