import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import magnifyingGlass from '../../magnifying-glass.png';

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
        } else {
            setUserData(null);
        }
    }, [user]);

    return(
        <>
            {user && userData ? 
                <footer className="footer-in border white-bg">
                    <Link to={'/search'} className="footer-link"><img src={magnifyingGlass} alt="search icon" className="glass"/></Link>
                    <Link to={'/posts/new'} className='new-post yellow-bg outline black-font'>+</Link>
                    <Link to={`/users/${user._id}`} className='footer-link'><img src={userData.imageUrl} className='footer-profile'/></Link>
                </footer>
                :
                <footer className="footer-out border white-bg">
                    <p className="bold">Start creating today.</p>
                    <p>Artstart</p>
                </footer>
            }
        </>
    );
};