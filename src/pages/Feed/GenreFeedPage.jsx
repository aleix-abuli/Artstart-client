import axios from 'axios';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeedPost from '../../components/FeedPost/FeedPost';
import Loader from '../../components/Loader/Loader';
import { FeedContext } from '../../context/feed.context';
import { AuthContext } from '../../context/auth.context';

const api = process.env.REACT_APP_API_URL;

export default function GenreFeedPage() {

    const { genrePosts, genreIndex, genrePost, setGenreIndex, setGenreChoice, goToBeginning } = useContext(FeedContext);

    const { user } = useContext(AuthContext);

    const { genre } = useParams();

    useEffect(() => {
        if(user && genre) {
            console.log('entering genre useEffect', genre);
            setGenreChoice(genre);
        }
    }, [user, genre]);

    const goToNext = (e) => {
        e.preventDefault();
        if(genreIndex < genrePosts.length-1) setGenreIndex(genreIndex + 1);
    };

    const goToPrevious = (e) => {
        e.preventDefault();
        if(genreIndex > 0) setGenreIndex(genreIndex - 1);
    };

    return (
        <>
            {genrePost?
                <>
                    <FeedPost post={genrePost} posts={genrePosts} index={genreIndex} setIndex={setGenreIndex}/>
                    {/* <button onClick={(__) => goToBeginning(setGenreIndex)}>Go to beginning</button>
                    {(genreIndex > 0) ?
                        <button onClick={goToPrevious}>previous</button>
                        :
                        <button>fake previous</button>
                    }
                    {(genreIndex < genrePosts.length-1) ?
                        <button onClick={goToNext}>next</button>
                        :
                        <button>fake next</button>
                    } */}
                </>
                :
                <>
                <Loader />
                </>
            }
        </>
    );
};