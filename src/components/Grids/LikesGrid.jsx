import { useEffect, useState } from "react";

export default function LikesGrid(props) {

    const [likedPosts, setLikedPosts] = useState(null);

    const { posts } = props;

    useEffect(() => {
        if(posts.length > 0) setLikedPosts(true);
    }, []);

    return (
        <>
            {likedPosts ? 
                <p>There are likes :)</p>
            :
                <p>You haven't liked any post yet :(</p>
            }
        </>
    )
}