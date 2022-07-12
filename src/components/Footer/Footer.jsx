import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const api = process.env.REACT_APP_API_URL;

export default function Footer() {

    const storedToken = localStorage.getItem('authToken');

    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if(user) {
            axios
            .get(`${api}/api/users/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => setUserData(data))
            .catch((err) => console.log(err));
        };
    }, [user]);

    return(
        <>
            {userData ? 
                <>
                    <Link to={'/search'}>🔎</Link>
                    <Link to={'/posts/new'}>+</Link>
                    <Link to={`/users/${user._id}`}><img src={userData.imageUrl} /></Link>
                </>
                :
                <p>Artstart :)</p>
            }
        </>
    );
};