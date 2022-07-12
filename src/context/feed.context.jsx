import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './auth.context';

const api = process.env.REACT_APP_API_URL;

const FeedContext = createContext();

function FeedProviderWrapper(props) {

    const storedToken = localStorage.getItem('authToken');

    const { user } = useContext(AuthContext);

    const [posts, setPosts] = useState(null);
    const [index, setIndex] = useState(null);
    const [post, setPost] = useState(null);

    const [likedPosts, setLikedPosts] = useState(null);
    const [likedIndex, setLikedIndex] = useState(null);
    const [likedPost, setLikedPost] = useState(null);

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genrePosts, setGenrePosts] = useState(null);
    const [genreIndex, setGenreIndex] = useState(null);
    const [genrePost, setGenrePost] = useState(null);

    useEffect(() => {

        axios
        .get(`${api}/api/posts`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setPosts(data.reverse());
            setIndex(0);
        })
        .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        setFollowing();
    }, [user]);

    useEffect(() => {

        if(posts && index !== null) setPost(posts[index]);
        if(likedPosts && likedIndex !== null) setLikedPost(likedPosts[likedIndex]);
        if(genrePosts && genreIndex !== null) {
            console.log('post is', genreIndex)
            setGenrePost(genrePosts[genreIndex]);
        }

    }, [posts, index, likedPosts, likedIndex, genrePosts, genreIndex]);

    const setFollowing = () => {
        if(user) {
            axios
            .get(`${api}/api/users/following/${user._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => {
                setLikedPosts(data.reverse());
                setLikedIndex(0);
            })
            .catch((err) => console.log(err));
        };
    };

    const setGenreChoice = (genre) => {
        if(genre !== selectedGenre) {

            setSelectedGenre(genre);

            axios
            .get(`${api}/api/genres/${genre}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => {
                data[0].items.reverse();
                setGenreIndex(0);
                return setGenrePosts(data[0].items);
            })
            .catch((err) => console.log(err));
        };
    };

    return (
        <FeedContext.Provider value={{
            posts, index, post, setIndex,
            likedPosts, likedIndex, likedPost, setLikedIndex,
            genrePosts, genreIndex, genrePost, setGenreIndex,
            setFollowing, setGenreChoice
            }}>
            {props.children}
        </FeedContext.Provider>
    );
};

export { FeedContext, FeedProviderWrapper };