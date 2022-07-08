import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const api = process.env.REACT_APP_API_URL;

export default function EditCollForm() {
    
    const storedToken = localStorage.getItem('authToken');

    const navigate = useNavigate();
    const { id } = useParams();

    const [collData, setCollData] = useState({
        title: '',
        description: ''
    });
    
    useEffect(() => {

        axios
        .get(`${api}/api/collections/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => setCollData(data))
        .catch((err) => console.log(err));

    }, []);

    const handleInputChange = (e) => {

        const { value, name } = e.currentTarget;
        setCollData({ ...collData, [name]: value });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        axios
        .post(`${api}/api/collections/${id}`, collData, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => navigate(`/collections/${data._id}`))
        .catch((err) => console.log(err));
        
    };

    const { title, description } = collData;
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input name='title' value={title} onChange={handleInputChange} required />

            <label htmlFor="description">Description</label>
            <input name='description' value={description} onChange={handleInputChange} required />

            <button type='submit'>Create</button>
        </form>
    )
};