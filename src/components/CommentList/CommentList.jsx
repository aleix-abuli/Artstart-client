import { useState, useEffect } from "react";
import CommentCard from '../CommentCard/CommentCard';
import NewCommentForm from '../NewCommentForm/NewCommentForm';

export default function CommentList(props) {

    const { comments, post, setComments } = props;

    const [thereAreComments, setThereAreComments] = useState(false);

    useEffect(() => {
        if(comments.length > 0) setThereAreComments(true);
    }, []);

    return(
        <>
            <h3>Comments</h3>
            {thereAreComments &&
            <div>
                {comments.map(comment => (
                    <CommentCard comment={comment} key={comment._id} />
                ))}
            </div>
            }
            <NewCommentForm post={post} setComments={setComments} />
        </>
    );
};