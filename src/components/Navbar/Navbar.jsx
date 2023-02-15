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
        <nav className='sticky-nav white-bg'>
            {user ?
                <>
                    <div className='nav border'>
                        <Link to={'#'} onClick={toggleMenu} className="bold logo-link" >ArtStart</Link>
                        <button onClick={logOutUser} className="nav-link white blue-bg outline bold">LOG OUT</button>
                    </div>
                    {displayingMenu && 
                        <div className='sub-nav'>
                            <Link to={'/feed'} onClick={() => setDisplayingMenu(false)} className='sub-nav-link bottom-border'>Feed</Link>
                            <Link to={'/following'} onClick={() => setDisplayingMenu(false)} className='sub-nav-link bottom-border'>Following</Link>
                            <Link to={'/genres'} onClick={() => setDisplayingMenu(false)} className='sub-nav-link'>Genres</Link>
                        </div>
                    }
                </>
                :
                <div  className='nav border'>
                    <Link to={'/'} className="bold logo-link">ArtStart</Link>
                    <div className='div-flex'>
                        <Link to={`/login`} className="nav-link yellow-bg outline bold">LOG IN</Link>
                        <Link to={`/signup`} className="nav-link white red-bg outline bold">SIGN UP</Link>
                    </div>
                </div>
            }
        </nav>
    );
};