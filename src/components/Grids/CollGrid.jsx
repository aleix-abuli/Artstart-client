import { useEffect, useState } from "react";

export default function CollGrid(props) {

    const [userCollections, setUserCollections] = useState(null);

    const { collections } = props;

    useEffect (() => {
        if(collections.length > 0) setUserCollections(true);
    }, []);

    return (
        <>
            {userCollections ? 
                <p>There are collections :)</p>
            :
                <p>You have no collections yet :(</p>
            }
        </>
    )
}