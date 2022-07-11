import axios from "axios";
import { useState } from "react";

const api = process.env.REACT_APP_API_URL;

export default function EditCommentForm(props) {

    const storedToken = localStorage.getItem('authToken');

    const { comment, setIsEditing, setCommentData } = props;

    const [commentEditData, setCommentEditData] = useState(comment);

    const handleInputChange = (e) => {

        e.preventDefault();

        const { value, name } = e.currentTarget;
        setCommentEditData({ ...commentEditData, [name]: value });

    };

    const cancelEdit = (e) => {

        e.preventDefault();
        setIsEditing(false);

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .put(`${api}/api/comments/${comment._id}`, commentEditData, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setCommentData(data);
            setIsEditing(false);
        })
        .catch((err) => console.log(err));
    };

    const { message } = commentEditData;

    return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="message"></label>
        <input name='message' value={message} onChange={handleInputChange} />

        <button onClick={cancelEdit}>Cancel</button>
        <button type="submit">Save</button>
    </form>
    );
};