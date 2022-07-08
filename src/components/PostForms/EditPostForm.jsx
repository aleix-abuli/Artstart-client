import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const api = process.env.REACT_APP_API_URL;

export default function EditPostForm() {

    const storedToken = localStorage.getItem('authToken');
    const { id } = useParams();
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
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

        axios
        .get(`${api}/api/posts/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setPostData({...data, genres: data.genres.map((genre) => genre._id)});
        })
        .catch((err) => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        const { value, name } = e.currentTarget;
        setPostData({ ...postData, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .put(`${api}/api/posts/${id}`, postData, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => navigate(`/posts/${data._id}`))
        .catch((err) => console.log(err));
    };

    function handleImageUpload(e) {
        e.preventDefault();
        setLoadingImage(true);

        const array = [ ...postData.imageArray ];
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
            setPostData({ ...postData, imageArray: updatedArr });
        })
        .catch(err => console.log(err));
    };

    const deleteImage = (e, index) => {
        e.preventDefault();
        const array = [ ...postData.imageArray ];
        array.splice(index, 1);
        return setPostData({ ...postData, imageArray: array });
    };

    const addGenre = (e) => {
        e.preventDefault();
        if(e.currentTarget.value) setPostData({
            ...postData,
            genres: [...postData.genres, e.currentTarget.value]
        });
    };

    const showGenre = (genre, index) => {
        if(genres) {
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
        }
    };

    const deleteGenre = (e, index) => {
        e.preventDefault();
        const array = [ ...postData.genres ];
        array.splice(index, 1);
        return setPostData({ ...postData, genres: array });
    };

    const { description } = postData;
    
    return (
        <form onSubmit={handleSubmit}>

            {postData.imageArray.length > 0 && (
                <>
                {postData.imageArray.map((image, index) => (
                    <div key={index}>
                        <img src={image} />
                        {index > 0 && <button onClick={(e) => deleteImage(e, index)}>X</button>}
                    </div>
                ))}
                </>
            )}

            <label>
                Add files
                <input name='imageUrl' type='file' onChange={handleImageUpload} style={{visbility:'hidden'}} />
            </label>

            <label htmlFor="description">Description</label>
            <textarea rows='4' cols='25' name='description' value={description} onChange={handleInputChange} />

            <label>Genres:</label>
            {postData.genres.length > 0 && (
                <>
                {postData.genres.map((genre, index) => showGenre(genre, index))}
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