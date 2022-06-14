import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogInForm() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const { email, password } = loginData;

    return(
        <>
            <form onSubmit={handleSubmit}>
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
            </form>
        </>
    );
};