import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "../../components/CommentList/CommentList";
import CollectionDetails from "../../components/CollectionDetails/CollectionDetails";

const api =  process.env.REACT_APP_API_URL;

export default function CollectionPage() {
    const storedToken = localStorage.getItem('authToken');

    const { id } = useParams();

    const [collection, setCollection] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {

        axios
        .get(`${api}/api/collections/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(({ data }) => {
            setCollection(data);
            setComments(data.comments);
        })
        .catch((err) => console.log(err));

    }, [])

    return (
        <>
            {collection && comments ?
                <>
                    <CollectionDetails collection={collection} posts={collection.items} />
                    <CommentList comments={comments} collection={collection._id} setComments={setComments} />
                </>
            :
                <>
                    <p>Something went wrong.</p>
                </>
            }
        </>
    );
};