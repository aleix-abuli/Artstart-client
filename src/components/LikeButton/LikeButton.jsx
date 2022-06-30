import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const api = process.env.REACT_APP_API_URL;

export default function LikeButton(props) {

    const { user } = useContext(AuthContext);

    const { post } = props;

    const handleLike = () => {

        const storedToken = localStorage.getItem("authToken");

        axios
        .post(`${api}/api/posts/like/${post._id}`, user, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => console.log(data))
        .catch((err) => console.log('couldn`t access database', err))

    };



    return(
        <>
            <img src='https://cdn.pixabay.com/photo/2020/09/30/07/48/heart-5614865_1280.png' onClick={handleLike} />
        </>
    );
};