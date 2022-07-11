import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import EditCommentForm from "../CommentForms/EditCommentForm";

const api = process.env.REACT_APP_API_URL;

export default function CommentCard(props) {

    const storedToken = localStorage.getItem('authToken');
    
    const { comment, ownsPublication } = props;
    const { owner } = comment;

    const { user } = useContext(AuthContext);

    const [commentData, setCommentData] =useState(comment);
    const [ownsComment, setOwnsComment] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if(user && user._id === owner._id) setOwnsComment(true);
    }, [user]);

    const showEditForm = (e) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleDelete = (e) => {
        e.preventDefault();

        axios
        .delete(`${api}/api/comments/${comment._id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setCommentData(null);
        })
        .catch((err) => console.log(err));
    };
    
    return(
        <>
        {commentData &&
            <>
            {ownsPublication?
                <>
                    {isEditing?
                        <EditCommentForm comment={commentData} setIsEditing={setIsEditing} setCommentData={setCommentData} />
                    :
                        <p>{commentData.message}</p>
                    }
                    <div>
                        <div>
                            <p>{owner.username}</p>
                            <img src={owner.imageUrl} />
                        </div>
                        {ownsComment && <button onClick={showEditForm}>Edit</button>}
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
                :
                <>
                    {isEditing?
                        <EditCommentForm comment={commentData} setIsEditing={setIsEditing} setCommentData={setCommentData} />
                    :
                        <p>{commentData.message}</p>
                    }
                    <div>
                        <div>
                            <p>{owner.username}</p>
                            <img src={owner.imageUrl} />
                        </div>
                        {ownsComment && <button onClick={showEditForm}>Edit</button>}
                        {ownsComment && <button onClick={handleDelete}>Delete</button>}
                    </div>
                </>
            }
            </>
        }
        </>
    );
};