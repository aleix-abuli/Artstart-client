import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const api = process.env.REACT_APP_API_URL;

export default function LogInForm() {

    const { storeToken, authenticateUser, user } = useContext(AuthContext);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .post(`${api}/api/auth/login`, loginData)
        .then(({ data }) => {
            storeToken(data.authToken);
            authenticateUser();
            setHasSubmitted(true);
        })
        .catch(err => console.log(err));
    };

    useEffect(() => {
        if(user) navigate('/feed');
    }, [user]);

    const { email, password } = loginData;

    return(
        <>
            {<form onSubmit={handleSubmit}>
                <label htmlFor="input-email"> e-mail:
                    <input
                        id="input-email"
                        type="text"
                        name="email"
                        placeholder="e-mail"
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label htmlFor="input-password"> Password:
                    <input
                        id="input-password"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <button type="submit">Log In</button>
            </form>}
        </>
    );
};