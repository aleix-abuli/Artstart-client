import PostGrid from "../Grids/PostGrid";

export default function CollectionDetails(props) {

    const { collection, posts } = props;

    return (
        <>
            <h1>{collection.title}</h1>
            <p>{collection.description}</p>
            <PostGrid posts={posts} />
        </>
    );
};