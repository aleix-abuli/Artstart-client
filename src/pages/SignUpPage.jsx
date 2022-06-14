import SignUpForm from '../components/SignUpForm/SignUpForm';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
    return (
        <>
            <SignUpForm />
            <div>
                <p>Already an artist?</p>
                <Link to='/login'>Log In</Link>
            </div>
        </>
    );
};