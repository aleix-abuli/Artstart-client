import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const api = process.env.REACT_APP_API_URL;

export default function NewPostForm() {

    const storedToken = localStorage.getItem('authToken');

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const [newPostData, setNewPostData] = useState({
        description: '',
        owner: '',
        imageArray: [],
        genres: []
    });

    const [loadingImage, setLoadingImage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [genres, setGenres] = useState(null);

    useEffect(() => {
        axios
        .get(`${api}/api/genres`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => setGenres(data))
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if(user) setNewPostData({...newPostData, owner: user._id});
    }, [user]);

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget;
        setNewPostData({ ...newPostData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(newPostData.imageArray.length === 0) setErrorMessage('You need to upload at least 1 picture.');
        else {
            axios
            .post(`${api}/api/posts`, newPostData, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(({ data }) => navigate(`/users/${data._id}`))
            .catch((err) => console.log(err));
        };
    };

    function handleImageUpload(e) {
        e.preventDefault();
        setLoadingImage(true);

        const array = [ ...newPostData.imageArray ];
        const uploadData = new FormData();
        uploadData.append('imageData', e.target.files[0]);

        axios
        .post(`${api}/api/upload`, uploadData, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            array.push(data.cloudinary_url);
            return array;
        })
        .then((updatedArr) => {
            setLoadingImage(false);
            setNewPostData({ ...newPostData, imageArray: updatedArr });
        })
        .catch(err => console.log(err));
    };

    const deleteImage = (e, index) => {
        e.preventDefault();
        const array = [ ...newPostData.imageArray ];
        array.splice(index, 1);
        return setNewPostData({ ...newPostData, imageArray: array });
    };

    const addGenre = (e) => {
        e.preventDefault();
        if(e.currentTarget.value) setNewPostData({
            ...newPostData,
            genres: [...newPostData.genres, e.currentTarget.value]
        });
    };

    const showGenre = (genre, index) => {

        for (let i=0; i<genres.length; i++) {
            if(genres[i]._id === genre) {
                return(
                    <div key={index}>
                        <p>{genres[i].genre}</p>
                        <button onClick={(e) => deleteGenre(e, index)}>X</button>
                    </div>
                );
            };
        };  
    };

    const deleteGenre = (e, index) => {
        e.preventDefault();
        const array = [ ...newPostData.genres ];
        array.splice(index, 1);
        return setNewPostData({ ...newPostData, genres: array });
    };

    const { description } = newPostData;

    return (
        <form onSubmit={handleSubmit}>

            {newPostData.imageArray.length > 0 && (
                <>
                {newPostData.imageArray.map((image, index) => (
                    <div key={index}>
                        <img src={image} />
                        <button onClick={(e) => deleteImage(e, index)}>X</button>
                    </div>
                ))}
                </>
            )}

            <label>
                Add files
                <input name='imageUrl' type='file' onChange={handleImageUpload} style={{visbility:'hidden'}} required />
            </label>

            <label htmlFor="description">Description</label>
            <textarea rows='4' cols='25' name='description' value={description} onChange={handleInputChange} />
            
            <label>Genres:</label>
            {newPostData.genres.length > 0 && (
                <>
                {newPostData.genres.map((genre, index) => showGenre(genre, index))}
                </>
            )}

            {genres && (
                <select onChange={addGenre}>
                    <option></option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre._id} >{genre.genre}</option>
                ))}
                </select>
            )}
            
            {errorMessage && <p>{errorMessage}</p>}

            {loadingImage ? <p>Loading...</p> : <button type='submit'>Post</button>}
        </form>
    );
};