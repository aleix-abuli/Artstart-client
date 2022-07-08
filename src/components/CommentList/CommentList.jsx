import { useState, useEffect } from "react";
import CommentCard from '../CommentCard/CommentCard';
import NewCommentForm from '../NewCommentForm/NewCommentForm';

export default function CommentList(props) {

    const { comments, post, collection, setComments } = props;

    const [thereAreComments, setThereAreComments] = useState(false);
    const [ownsPublication, setOwnsPublication] = useState(false); // Still working on this, we need to check if user owns the whole collection or also if they won one of the comments at least
    const [ownsComment, setOwnsComment] = useState(false);

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
            {post && <NewCommentForm post={post} setComments={setComments} setThereAreComments={setThereAreComments} />}
            {collection && <NewCommentForm collection={collection} setComments={setComments} setThereAreComments={setThereAreComments} />}
            
        </>
    );
};