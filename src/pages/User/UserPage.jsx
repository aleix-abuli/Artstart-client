import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileCard from '../../components/UserProfile/ProfileCard';
import PostGrid from '../../components/Grids/PostGrid';
import LikesGrid from '../../components/Grids/LikesGrid';
import CollGrid from '../../components/Grids/CollGrid';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

const api = process.env.REACT_APP_API_URL;

export default function UserPage() {
    
    const { user } = useContext(AuthContext);

    const { id } = useParams();
    
    const storedToken = localStorage.getItem('authToken');
    
    const [userData, setUser] = useState(null);
    const [content, setContent] = useState('posts');
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {

        axios
        .get(`${api}/api/users/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setUser(data);
        })
        .catch((err) => console.log(err));

    }, []);

    useEffect(() => {

        if(user && userData && user._id === userData._id) setIsOwner(true);

    }, [user, userData])

    const goToPosts = (e) => {
        e.preventDefault();
        setContent('posts');
    };

    const goToLikes = (e) => {
        e.preventDefault();
        setContent('likes');
    };

    const goToColl = (e) => {
        e.preventDefault();
        setContent('collections');
    };

    return (
        <>
            {userData ?
                <>
                    <ProfileCard user={userData} />

                    <div>
                        <Link to={'#'} onClick={goToPosts}>Posts</Link>
                        <Link to={'#'} onClick={goToLikes}>Likes</Link>
                        <Link to={'#'} onClick={goToColl}>Collections</Link>
                    </div>
                    {isOwner && <Link to={`/users/${id}/edit`}>Edit profile</Link>}
                    {(() => {
                        switch(content) {
                            case 'posts': return <PostGrid posts={userData.posts} />;
                            case 'likes': return <LikesGrid posts={userData.likes} />;
                            case 'collections': return <CollGrid collections={userData.collections} />;
                        }
                    })()}
                </>
            :
                <>
                    <p>User not found. Please try again.</p>
                </>
            }
        </>
    );
};