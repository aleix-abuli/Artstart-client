import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FollowingList from "../../components/FollowingList/FollowingList";
import Loader from "../../components/Loader/Loader";

const api = process.env.REACT_APP_API_URL;

export default function FollowingListPage() {

    const storedToken = localStorage.getItem('authToken');

    const { id } = useParams();

    const [followees, setFollowees] = useState(null);

    useEffect(() => {

        axios
        .get(`${api}/api/users/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => setFollowees(data.following))
        .catch((err) => console.log(err));

    }, []);


    return (
        <>
            {followees ?
                <FollowingList followees={followees} />
                :
                <Loader />
            }
        </>
    );
};