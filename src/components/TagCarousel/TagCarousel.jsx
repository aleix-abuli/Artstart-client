export default function TagCarousel(props) {

    const { tags } = props;

    return(
        <>
            {tags.map(tag => (
                <p key={tag._id}>{tag.genre}</p>
            ))}
        </>
    );
};