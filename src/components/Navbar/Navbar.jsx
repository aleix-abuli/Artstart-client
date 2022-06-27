import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

export default function Navbar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return(
        <nav>
            <h1>Navbar</h1>
            {user ?
                <div>
                    <Link to={`/users/${user._id}`} className='navLink white' >Profile</Link>
                    <button onClick={logOutUser} className='navBtn green tigerBack' >Log out</button>
                </div>
                :
                <div>
                    <Link to={`/login`} className='navLink white' >Log in</Link>
                    <Link to={`/signup`} className='navLink white' >Sign up</Link>
                </div>
            }
        </nav>
    );
};