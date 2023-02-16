import { Link } from 'react-router-dom';

export default function SaveButton(props) {

    const { post } = props;

    return(
        <Link to={`/posts/${post._id}/save`} className='save-btn-a'>
         <button className='save-btn white black-bg thin outline'>Save</button>
        </Link>
    );
};