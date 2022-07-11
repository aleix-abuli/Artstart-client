import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const api = process.env.REACT_APP_API_URL;

export default function FollowButton(props) {

    const storedToken = localStorage.getItem('authToken');

    const { otherUser } = props;

    const { user } = useContext(AuthContext);

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {    
        checkFollowing();
    }, [user]);

    const checkFollowing = () => {

        if(user) {

            axios
            .get(`${api}/api/users/${user._id}`)
            .then(({ data }) => {
                if(data.following.includes(otherUser._id)) setIsFollowing(true);
                else setIsFollowing(false);
            })
            .catch((err) => console.log(err));

        };

    };

    const handleFollow = (e) => {

        e.preventDefault();

        axios
        .post(`${api}/api/users/follow/${otherUser._id}`, user, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => checkFollowing())
        .catch((err) => console.log(err));

    };

    const handleUnfollow = (e) => {

        e.preventDefault();

        axios
        .post(`${api}/api/users/unfollow/${otherUser._id}`, user, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => checkFollowing())
        .catch((err) => console.log(err));

    };

    return(
        <>
            {isFollowing? <button onClick={handleUnfollow}>Unfollow</button> : <button onClick={handleFollow}>Follow</button>}
        </>
    );
};