import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { FeedContext } from "../../context/feed.context";
import FeedPost from "../../components/FeedPost/FeedPost";
import Loader from "../../components/Loader/Loader";

const api = process.env.REACT_APP_API_URL;

export default function FeedPage() {

    const { posts, index, post, setIndex, goToBeginning } = useContext(FeedContext);

   /*  const goToNext = (e) => {
        e.preventDefault();
        if(index < posts.length-1) setIndex(index + 1);
    };

    const goToPrevious = (e) => {
        e.preventDefault();
        if(index > 0) setIndex(index - 1);
    }; */

    return (
        <>
            {post?
                <>
                    <FeedPost post={post} posts={posts} index={index} setIndex={setIndex} />
                    {/* <button onClick={(__) => goToBeginning(setIndex)}>Go to beginning</button>
                    {(index > 0) ?
                        <button onClick={goToPrevious}>previous</button>
                        :
                        <button>fake previous</button>
                    }
                    {(index < posts.length-1) ?
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