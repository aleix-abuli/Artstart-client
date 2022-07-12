import axios from "axios";
import { useEffect, useState, useContext } from "react";
import FeedPost from "../../components/FeedPost/FeedPost";
import Loader from "../../components/Loader/Loader";
import { FeedContext } from "../../context/feed.context";

const api = process.env.REACT_APP_API_URL;

export default function FeedPage() {

    const storedToken = localStorage.getItem('authToken');

    const { posts, index, post, setIndex } = useContext(FeedContext);

    const goToNext = (e) => {
        e.preventDefault();
        if(index < posts.length-1) setIndex(index + 1);
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
                    {(index < posts.length-1) ?
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