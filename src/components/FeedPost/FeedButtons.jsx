import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import { FeedContext } from "../../context/feed.context";

export default function FeedButtons(props) {
    
    const { goToBeginning } = useContext(FeedContext);
    
    const { index, setIndex, posts } = props;

    const goToNext = (e) => {
        e.preventDefault();
        if(index < posts.length-1) setIndex(index + 1);
    };

    const goToPrevious = (e) => {
        e.preventDefault();
        if(index > 0) setIndex(index - 1);
    };


    return(
        <>
            <button onClick={(__) => goToBeginning(setIndex)}>Go to beginning</button>

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
    );
};