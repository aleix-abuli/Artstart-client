import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

const api = process.env.REACT_APP_API_URL;

export default function LikeButton(props) {

    const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext);

    const { post } = props;

    const [likesPost, setLikesPost] = useState(false);

    useEffect(() => {    
        checkLike();
    }, [user]);

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
        .then(({ data }) => checkLike())
        .catch((err) => console.log('couldn`t access database', err))
    };

    const handleUnlike = (e) => {

        e.preventDefault();

        axios
        .post(`${api}/api/posts/unlike/${post._id}`, user, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => checkLike())
        .catch((err) => console.log('couldn`t access database', err))
    };

    return(
        <>
            {likesPost? <button onClick={handleUnlike}>Liked</button> : <button onClick={handleLike}>Like</button>}
        </>
    );
};