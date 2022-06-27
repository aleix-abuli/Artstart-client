import LogInForm from '../../components/LogInForm/LogInForm';
import { Link } from 'react-router-dom';

export default function LogInPage() {
    return (
        <>
            <LogInForm />
            <div>
                <p>Not registered yet?</p>
                <Link to='/signup'>Sign up</Link>
            </div>
        </>
    );
};