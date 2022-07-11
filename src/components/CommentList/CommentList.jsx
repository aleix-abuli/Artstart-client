import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import CommentCard from '../CommentCard/CommentCard';
import NewCommentForm from '../CommentForms/NewCommentForm';

export default function CommentList(props) {

    const { comments, post, collection, setComments } = props;

    const { user } = useContext(AuthContext);

    const [thereAreComments, setThereAreComments] = useState(false);
    const [ownsPublication, setOwnsPublication] = useState(false); // Still working on this, we need to check if user owns the whole collection or also if they won one of the comments at least

    useEffect(() => {
        if(comments.length > 0) setThereAreComments(true);
    }, []);

    useEffect(() => {
        if(user && collection && user._id === collection.owner) setOwnsPublication(true);
        else if(user && post && user._id === post.owner) setOwnsPublication(true);
    }, [user]);

    return(
        <>
            <h3>Comments</h3>
            {thereAreComments &&
            <div>
                {comments.map(comment => (
                    <CommentCard comment={comment} ownsPublication={ownsPublication} key={comment._id} />
                ))}
            </div>
            }
            {post && <NewCommentForm post={post} setComments={setComments} setThereAreComments={setThereAreComments} />}
            {collection && <NewCommentForm collection={collection} setComments={setComments} setThereAreComments={setThereAreComments} />}
            
        </>
    );
};