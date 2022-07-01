import { Link } from 'react-router-dom';

export default function SaveButton(props) {

    const { post } = props;

    return(
        <Link to={`/posts/${post._id}/save`}>
         <img src='https://upload.wikimedia.org/wikipedia/commons/0/00/Follow_button.png' />
        </Link>
    );
};