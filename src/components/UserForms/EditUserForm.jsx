import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const api = process.env.REACT_APP_API_URL;

export default function EditUserForm () {
    
    const { id } = useParams();
    const navigate = useNavigate();

    const storedToken = localStorage.getItem('authToken');

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        name: '',
        imageUrl: null
    });

    const [loadingImage, setLoadingImage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
    
        axios
        .get(`${api}/api/users/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => setUserData(data))
        .catch((err) => console.log(err));

    }, []);

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget
        setUserData({ ...userData, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .put(`${api}/api/users/${id}`, userData, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((__) => navigate(`/users/${id}`))
        .catch(err => console.log(err));
    };

    function handleImageUpload(e) {
        e.preventDefault();
        setLoadingImage(true);

        const uploadData = new FormData();
        uploadData.append('imageData', e.target.files[0]);

        axios
        .post(`${api}/api/upload`, uploadData, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setLoadingImage(false);
            setUserData({ ...userData, imageUrl: data.cloudinary_url });
        })
        .catch(err => console.log(err));
    };

    const { username, email, name, imageUrl } = userData;
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="input-username"> Username:
                <input
                    id="input-username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleInputChange}
                    required
                />
            </label>

            <label htmlFor="input-email"> e-mail:
                <input
                    id="input-email"
                    type="text"
                    name="email"
                    placeholder="e-mail"
                    value={email}
                    onChange={handleInputChange}
                    required
                />
            </label>
            
            <label htmlFor="name"> Name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    required
                />
            </label>

            {imageUrl && <img src={imageUrl} />}

            <label htmlFor="imageUrl"> Profile pic:
                <input
                    type="file"
                    name="imageUrl"
                    onChange={handleImageUpload}
                />
            </label>

            {errorMessage && <p>{errorMessage}</p>}

            {loadingImage ? <p>Loading...</p> : <button type='submit'>Save changes</button>}

        </form>
    )
};