import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProfileCard from '../../components/UserProfile/ProfileCard';
import PostGrid from '../../components/Grids/PostGrid';
import LikesGrid from '../../components/Grids/LikesGrid';
import CollGrid from '../../components/Grids/CollGrid';

const api = process.env.REACT_APP_API_URL;

export default function UserPage() {
    
    const { id } = useParams();
    
    const storedToken = localStorage.getItem('authToken');
    
    const [user, setUser] = useState(null);
    const [content, setContent] = useState('posts');

    useEffect(() => {

        axios
        .get(`${api}/api/users/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setUser(data);
        })
        .catch((err) => console.log(err));

    }, []);

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
            {user ?
                <>
                    <ProfileCard user={user} />
                    <div>
                        <Link to={'#'} onClick={goToPosts}>Posts</Link>
                        <Link to={'#'} onClick={goToLikes}>Likes</Link>
                        <Link to={'#'} onClick={goToColl}>Collections</Link>
                    </div>
                    {(() => {
                        switch(content) {
                            case 'posts': return <PostGrid posts={user.posts} />;
                            case 'likes': return <LikesGrid posts={user.likes} />;
                            case 'collections': return <CollGrid collections={user.collections} />;
                        }
                    })()}
                </>
            :
                <>
                    <p>Something went wrong.</p>
                </>
            }
        </>
    );
};