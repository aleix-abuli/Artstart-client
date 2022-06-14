import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm() {

    const [signUpData, setSignUpData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        setSignUpData({ ...signUpData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const { username, email, password } = signUpData;

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-username"> Username:
                    <input
                        id="input-username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleInputChange}
                        required
                    />
                </label>

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

                <button type="submit">Register</button>
            </form>
        </>
    );
};