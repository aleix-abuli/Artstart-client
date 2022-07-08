import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import PostGrid from "../Grids/PostGrid";

export default function CollectionDetails(props) {

    const { collection, posts } = props;

    const { user } = useContext(AuthContext);

    const [isOwner, setIsOwner] = useState(true);

    useEffect(() => {
        if(user._id === collection.owner) setIsOwner(true);
    }, []);

    return (
        <>
            <h1>{collection.title}</h1>
            <p>{collection.description}</p>
            {isOwner && <Link to={`/collections/${collection._id}/edit`}>Edit</Link>}
            <PostGrid posts={posts} />
        </>
    );
};