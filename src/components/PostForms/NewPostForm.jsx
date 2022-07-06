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
    const [imageList, setImageList] = useState([{image: ''}]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {

        if(user) setNewPostData({...newPostData, owner: user._id});

    }, [user]);

    const addImageInput = (e) => {

        e.preventDefault();
        setImageList([ ...imageList, {image: ''}]);

    };

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
            .then((post) => console.log('created one post', post))
            .catch((err) => console.log(err));

        };

    };

    function handleImageUpload(e) {

        e.preventDefault();
        setLoadingImage(true);

        const array = [ ...newPostData.imageArray ];

        const uploadData = new FormData();
        uploadData.append('imageData', e.target.files[0]);

        console.log('Array before uploading', array)

        axios
        .post(`${api}/api/upload`, uploadData, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            array.push(data.cloudinary_url);
            return array;
        })
        .then((updatedArr) => {
            console.log('new array: ', updatedArr)
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

    const { description } = newPostData;

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="description">Description</label>
            <textarea rows='4' cols='25' name='description' value={description} onChange={handleInputChange} />

            <label htmlFor="imageUrl">Images</label>
            {imageList.map((input, index) => (
                <input key={index} name='imageUrl' type='file' onChange={handleImageUpload} required />
            ))}

            <button onClick={addImageInput}>Add more images</button>

            {newPostData.imageArray.length > 0 && (
                <>
                {newPostData.imageArray.map((image, index) => (
                    <>
                        <img src={image} />
                        <button onClick={(e) => deleteImage(e, index)}>X</button>
                    </>
                ))}
                </>
            )}

            {errorMessage && <p>{errorMessage}</p>}

            {loadingImage ? <p>Loading...</p> : <button type='submit'>Post</button>}
        </form>
    );
};