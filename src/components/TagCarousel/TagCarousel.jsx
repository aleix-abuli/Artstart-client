export default function TagCarousel(props) {

    const { tags } = props;

    return(
        <>
            {tags.map((tag, index) => (
                <p key={index} >{tag.genre}</p>
            ))}
        </>
    );
};