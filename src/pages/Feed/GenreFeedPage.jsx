import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeedPost from '../../components/FeedPost/FeedPost';
import Loader from '../../components/Loader/Loader';

const api = process.env.REACT_APP_API_URL;

export default function GenreFeedPage() {

    const storedToken = localStorage.getItem('authToken');

    const { genre } = useParams();

    const [genreDB, setGenreDB] = useState(null);
    const [index, setIndex] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {

        axios
        .get(`${api}/api/genres/${genre}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            data[0].items.reverse();
            setIndex(0);
            return setGenreDB(data[0].items);
        })
        .catch((err) => console.log(err));

    }, []);

    useEffect(() => {
        if(genreDB && index !== null) setPost(genreDB[index]);
    }, [genreDB, index]);

    const goToNext = (e) => {
        e.preventDefault();
        if(index < genreDB.length-1) setIndex(index + 1);
    };

    const goToPrevious = (e) => {
        e.preventDefault();
        if(index > 0) setIndex(index - 1);
    };

    return (
        <>
            {post?
                <>
                    <FeedPost post={post} />
                    {(index > 0) ?
                        <button onClick={goToPrevious}>previous</button>
                        :
                        <button>fake previous</button>
                    }
                    {(index < genreDB.length-1) ?
                        <button onClick={goToNext}>next</button>
                        :
                        <button>fake next</button>
                    }
                </>
                :
                <>
                <Loader />
                </>
            }
        </>
    );
};