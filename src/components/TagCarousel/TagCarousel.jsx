export default function TagCarousel(props) {

    const { tags } = props;

    return(
        <>
            {tags.length > 0 &&
                <div className="tag-carousel-div border-top">
                    {tags.map((tag, index) => (
                        <p className="tag-carousel-p" key={index} >{tag.genre}</p>
                    ))}
                </div>
            }
        </>
    );
};