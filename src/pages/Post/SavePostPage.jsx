import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const api = process.env.REACT_APP_API_URL;

export default function SavePostPage() {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [collections, setCollections] = useState(null);
    const [thereAreColl, setThereAreColl] = useState(false);

    const storedToken = localStorage.getItem('authToken');

    useEffect(() => {

        if(user) {
            axios
            .get(`${api}/api/users/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => {
                console.log('data from db', data)
                if(data.collections.length > 0) return setCollections(data.collections);
            })
            .catch((err) => console.log(err));
        };

    }, [user]);

    const savePost = (collection, postId) => {

        const reqbody = {
            postId: postId
        };

        axios
        .put(`${api}/api/collections/${collection}`, reqbody, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => navigate(`/collections/${data._id}`))
        .catch((err) => console.log(err));

    };

    return (
        <>
            <h1>Choose a collection</h1>
            {collections && collections.map((collection) => {
                    if(collection.items.includes(id)) {
                        return (
                            <div>
                                <p>TAKEN! {collection.title}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div key={collection._id} >
                                <p onClick={() => savePost(collection._id, id)} >{collection.title}</p> {/* missing a route to save collections */}
                            </div>
                        );
                    }
                }
            )}
            <Link to={`/posts/${id}/save/new`}>New Collection</Link>
        </>
    );
};