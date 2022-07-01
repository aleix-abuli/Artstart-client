import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const api = process.env.REACT_APP_API_URL;

export default function SavePostPage() {
    
    const { id } = useParams();

    const { user } = useContext(AuthContext);

    const [collections, setCollections] = useState(null);

    const storedToken = localStorage.getItem('authToken');

    useEffect(() => {

        axios
        .get(`${api}/api/users/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => setCollections(data.collections))
        .catch((err) => console.log(err));

    }, []);

    return (
        <>
            <h1>Choose a collection</h1>
            {collections && collections.map((collection) => (
                <div>
                    <p>{collection.title}</p> {/* missing a route to save collections */}
                </div>
            ))}
            <Link to={`/posts/${id}/save/new`}>New Collection</Link>
        </>
    );
};