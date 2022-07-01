import { useEffect, useState } from "react";
import PostGridPost from '../PostGridPost/PostGridPost';

export default function LikesGrid(props) {

    const [likedPosts, setLikedPosts] = useState(null);

    const { posts } = props;

    useEffect(() => {
        if(posts.length > 0) setLikedPosts(true);
    }, []);

    return (
        <>
            {likedPosts ? 
                <>
                {posts.map(post => (
                    <PostGridPost post={post} key={post._id} />
                ))}
                </>
            :
                <p>You haven't liked any post yet :(</p>
            }
        </>
    )
}