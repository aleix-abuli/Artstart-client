import { Link } from 'react-router-dom';

export default function CollGridColl(props) {

    const { collection } = props;

    return(
        <Link to={`/collections/${collection._id}`}>{collection.title}</Link>
    );
};