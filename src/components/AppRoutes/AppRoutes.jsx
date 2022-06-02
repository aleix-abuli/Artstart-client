import { Routes, Route } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage';
import SignUpPage from '../../pages/SignUpPage';
import LogInPage from '../../pages/LogInPage';
import FeedPage from '../../pages/FeedPage';
import FollowingPage from '../../pages/FollowingPage';
import GenresChoicePage from '../../pages/GenresChoicePage';
import GenreFeedPage from '../../pages/GenreFeedPage';
import UserPage from '../../pages/UserPage';
import EditUserPage from '../../pages/EditUserPage';
import PostPage from '../../pages/PostPage';
import NewPostPage from '../../pages/NewPostPage';
import EditPostPage from '../../pages/EditPostPage';
import SavePostPage from '../../pages/SavePostPage';
import NewCollectionPage from '../../pages/NewCollectionPage';
import CollectionPage from '../../pages/CollectionPage';
import EditCollectionPage from '../../pages/EditCollectionPage';

export default function AppRoutes() {

    return(
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='/feed' element={<FeedPage />} />
            <Route path='/following' element={<FollowingPage />} />
            <Route path='/genres' element={<GenresChoicePage />} />
            <Route path='/genres/:genre' element={<GenreFeedPage />} />
            <Route path='/users/:id' element={<UserPage />} /> {/* Not sure how to put the three different sections, maybe it's better to have it only in one single route */}
            <Route path='/users/:id/edit' element={<EditUserPage />} />
            <Route path='/posts/new' element={<NewPostPage />} />
            <Route path='/posts/:id' element={<PostPage />} />
            <Route path='/posts/:id/edit' element={<EditPostPage />} />
            <Route path='/posts/:id/save' element={<SavePostPage />} />
            <Route path='/posts/:id/save/new' element={<NewCollectionPage />} />
            <Route path='/collections/:id' element={<CollectionPage />} />
            <Route path='/collections/:id/edit' element={<EditCollectionPage />} />
        </Routes>
    );
};