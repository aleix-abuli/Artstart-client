import { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

export default function Navbar() {

    const { user, logOutUser } = useContext(AuthContext);

    const [displayingMenu, setDisplayingMenu] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        setDisplayingMenu(!displayingMenu);
    };

    return(
        <nav>
            {user ?
                <div>
                    <Link to={'#'} onClick={toggleMenu} >Artstart</Link>
                    {displayingMenu && 
                        <div>
                            <Link to={'/feed'}>Feed</Link>
                            <Link to={'/following'}>Following</Link>
                            <Link to={'/genres'}>Genres</Link>
                        </div>
                    }
                    <button onClick={logOutUser} >Log out</button>
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