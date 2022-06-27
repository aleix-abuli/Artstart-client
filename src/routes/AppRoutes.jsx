import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/PublicPages/LandingPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import LogInPage from '../pages/LogIn/LogInPage';
import FeedPage from '../pages/Feed/FeedPage';
import FollowingPage from '../pages/Feed/FollowingPage';
import GenresChoicePage from '../pages/Genre/GenresChoicePage';
import GenreFeedPage from '../pages/Feed/GenreFeedPage';
import UserPage from '../pages/User/UserPage';
import EditUserPage from '../pages/User/EditUserPage';
import PostPage from '../pages/Post/PostPage';
import NewPostPage from '../pages/Post/NewPostPage';
import EditPostPage from '../pages/Post/EditPostPage';
import SavePostPage from '../pages/Post/SavePostPage';
import NewCollectionPage from '../pages/Collection/NewCollectionPage';
import CollectionPage from '../pages/Collection/CollectionPage';
import EditCollectionPage from '../pages/Collection/EditCollectionPage';
import ErrorPage from '../pages/ErrorPage';


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


            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};