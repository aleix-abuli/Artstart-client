import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
            <h1>WELCOME TO ARTSTART.</h1>
            <h2>Discover. Create. Share.</h2>
            <Link to={'/login'}>Log In</Link>
            <Link to={'/signup'}>Sign Up</Link>
        </>
    );
};