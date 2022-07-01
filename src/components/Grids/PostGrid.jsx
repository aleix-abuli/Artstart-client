import { useEffect, useState } from "react";
import PostGridPost from '../PostGridPost/PostGridPost';

export default function PostGrid(props) {

    const [userPosts, setUserPosts] = useState(null);

    const { posts } = props;

    useEffect(() => {
        if(posts.length > 0) setUserPosts(true);
    }, []);

    return (
        <>
            {userPosts ? 
                <>
                {posts.map(post => (
                    <PostGridPost post={post} key={post._id} />
                ))}
                </>
            :
                <p>You haven't posted anything yet :(</p>
            }
        </>
    )
}