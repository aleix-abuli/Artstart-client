import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const api = process.env.REACT_APP_API_URL;

export default function NewCollForm() {

    const storedToken = localStorage.getItem('authToken');

    const navigate = useNavigate();
    const { id } = useParams();

    const [newCollData, setNewCollData] = useState({
        title: '',
        description: '',
        postToSave: null
    });
    
    useEffect(() => {

        if(id) setNewCollData({ ...newCollData, postToSave: id});

    }, []);

    const handleInputChange = (e) => {

        const { value, name } = e.currentTarget;
        setNewCollData({ ...newCollData, [name]: value });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        axios
        .post(`${api}/api/collections`, newCollData, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => navigate(`/collections/${data._id}`))
        .catch((err) => console.log(err));
        
    };

    const { title, description } = newCollData;

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input name='title' value={title} onChange={handleInputChange} required />

            <label htmlFor="description">Description</label>
            <input name='description' value={description} onChange={handleInputChange} required />

            <button type='submit'>Create</button>
        </form>
    );
};