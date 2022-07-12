import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import FeedPost from "../../components/FeedPost/FeedPost";
import Loader from "../../components/Loader/Loader";
import { FeedContext } from "../../context/feed.context";

const api = process.env.REACT_APP_API_URL;

export default function FollowingPage() {

    const { likedPosts, likedIndex, likedPost, setLikedIndex } = useContext(FeedContext);

    const goToNext = (e) => {
        e.preventDefault();
        if(likedIndex < likedPosts.length-1) setLikedIndex(likedIndex + 1);
    };

    const goToPrevious = (e) => {
        e.preventDefault();
        if(likedIndex > 0) setLikedIndex(likedIndex - 1);
    };

    return (
        <>
            {likedPost?
                <>
                    <FeedPost post={likedPost} />
                    {(likedIndex > 0) ?
                        <button onClick={goToPrevious}>previous</button>
                        :
                        <button>fake previous</button>
                    }
                    {(likedIndex < likedPosts.length-1) ?
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