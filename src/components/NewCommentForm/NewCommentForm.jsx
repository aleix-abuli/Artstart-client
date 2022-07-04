import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const api = process.env.REACT_APP_API_URL;

export default function NewCommentForm(props) {

    const storedToken = localStorage.getItem('authToken');

    const { user } = useContext(AuthContext);
    const { post, collection, setComments } = props;
    
    const [newCommentData, setNewCommentData] = useState({
        message: '',
        owner: user._id,
        post: post
    });

    const handleInputChange = (e) => {

        const { value, name } = e.currentTarget;
        setNewCommentData({ ...newCommentData, [name]: value });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if(post) {

            axios
            .post(`${api}/api/comments/posts`, newCommentData, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => {
                setNewCommentData({...newCommentData, message: ''});
                setComments(data);
            })
            .catch((err) => console.log(err));

        } else if(collection) {

            axios
            .post(`${api}/api/comments/collections`, newCommentData, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => {
                setNewCommentData({...newCommentData, message: ''});
                setComments(data);
            })
            .catch((err) => console.log(err));
            
        };

    };

    const { message } = newCommentData;
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="message" />
            <textarea rows='4' colls='25' name='message' value={message} onChange={handleInputChange} required />

            <button type="submit">Comment</button>
        </form>
    );
};