import { Link } from 'react-router-dom';

export default function SaveButton(props) {

    const { post } = props;

    return(
        <Link to={`/posts/${post._id}/save`}>
         <button>Save to...</button>
        </Link>
    );
};