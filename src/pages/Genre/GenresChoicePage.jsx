import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const api = process.env.REACT_APP_API_URL;

export default function GenresChoicePage() {

    const [genres, setGenres] = useState(null);

    const storedToken = localStorage.getItem('authToken');

    useEffect(() => {
        axios
        .get(`${api}/api/genres`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setGenres(data.sort((a, b) => {
                if(a.genre > b.genre) return 1;
                if(a.genre < b.genre) return -1;
                else return 0;
            }));
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <>
            {genres ? 
                <>
                    {genres.map((genre) => (
                        <h3 key={genre._id}>{genre.genre}</h3>
                    ))}
                </>
            :
                <>
                Something went wrong :(
                </>
            }
        </>
    );
};