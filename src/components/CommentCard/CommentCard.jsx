export default function CommentCard(props) {
    
    const { comment } = props;
    const { owner } = comment;
    
    return(
        <div>
            <p>{comment.message}</p>
            <div>
                <p>{owner.username}</p>
                <img src={owner.imageUrl} />
            </div>
        </div>
    );
};