import { useEffect, useState } from "react";

export default function PostGrid(props) {

    const [userPosts, setUserPosts] = useState(null);

    const { posts } = props;

    useEffect(() => {
        if(posts.length > 0) setUserPosts(true);
    }, []);

    return (
        <>
            {userPosts ? 
                <p>There are posts :)</p>
            :
                <p>You haven't posted anything yet :(</p>
            }
        </>
    )
}