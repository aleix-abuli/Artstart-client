import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeedPost from '../../components/FeedPost/FeedPost';

const api = process.env.REACT_APP_API_URL;

export default function GenreFeedPage() {

    const { genre } = useParams();

    const [genreDB, setGenreDB] = useState(null);

    useEffect(() => {

        const storedToken = localStorage.getItem('authToken');

        axios
        .get(`${api}/api/genres/${genre}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => setGenreDB(data[0]))
        .catch((err) => console.log(err));

    }, [])

    return (
        <>
            {genreDB ?
                <>
                {genreDB.items.map(post => (
                    <FeedPost post={post} key={post._id} />
                ))}
                </>
            :
                <>
                </>
            }
        </>
    );
};