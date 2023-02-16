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
            {/* <button onClick={(__) => goToBeginning(setIndex)}>Go to beginning</button> */}

            <div className='feed-btn-div'>
                {(index > 0) ?
                    <button onClick={goToPrevious} className='feed-btn bold white black-bg'>&lt;</button>
                    :
                    <button className='feed-btn bold white black-bg fake-border'>//</button>
                }
                {(index < posts.length-1) ?
                    <button onClick={goToNext} className='feed-btn bold black white-bg'>&gt;</button>
                    :
                    <button className='feed-btn bold gray white-bg'>//</button>
                }
            </div>
        </>
    );
};