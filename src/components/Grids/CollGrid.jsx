import { useEffect, useState } from "react";
import CollGridColl from '../../components/CollGridColl/CollGridColl';

export default function CollGrid(props) {

    const [userCollections, setUserCollections] = useState(null);

    const { collections } = props;

    useEffect (() => {
        if(collections.length > 0) setUserCollections(true);
    }, []);

    return (
        <>
            {userCollections ? 
                <>
                {collections.map(collection => (
                    <CollGridColl collection={collection} key={collection._id} />
                ))}
                </>
            :
                <p>You have no collections yet :(</p>
            }
        </>
    )
}