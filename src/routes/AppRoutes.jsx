import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/PublicPages/LandingPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import LogInPage from '../pages/LogIn/LogInPage';
import FeedPage from '../pages/Feed/FeedPage';
import FollowingPage from '../pages/Feed/FollowingPage';
import GenresChoicePage from '../pages/Genre/GenresChoicePage';
import GenreFeedPage from '../pages/Feed/GenreFeedPage';
import UserPage from '../pages/User/UserPage';
import FollowingListPage from '../pages/User/FollowingListPage';
import EditUserPage from '../pages/User/EditUserPage';
import UserSearchPage from '../pages/UserSearchPage/UserSearchPage';
import PostPage from '../pages/Post/PostPage';
import NewPostPage from '../pages/Post/NewPostPage';
import EditPostPage from '../pages/Post/EditPostPage';
import SavePostPage from '../pages/Post/SavePostPage';
import NewCollectionPage from '../pages/Collection/NewCollectionPage';
import CollectionPage from '../pages/Collection/CollectionPage';
import EditCollectionPage from '../pages/Collection/EditCollectionPage';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from './PrivateRoute';


export default function AppRoutes() {
    return(
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LogInPage />} />

            <Route path="/feed" element={<PrivateRoute />}>
                <Route path="" element={<FeedPage />} />
            </Route>

            <Route path='/following' element={<PrivateRoute />}>
                <Route path="" element={<FollowingPage />} />
            </Route>

            <Route path='/genres' element={<PrivateRoute />}>
                <Route path="" element={<GenresChoicePage />} />
            </Route>

            <Route path='/genres/:genre' element={<PrivateRoute />}>
                <Route path="" element={<GenreFeedPage />} />
            </Route>

            <Route path='/users/:id' element={<PrivateRoute />}>
                <Route path="" element={<UserPage />} />
            </Route>
            
            <Route path='/users/:id/following' element={<PrivateRoute />}>
                <Route path="" element={<FollowingListPage />} />
            </Route>

            <Route path='/users/:id/edit' element={<PrivateRoute />}>
                <Route path="" element={<EditUserPage />} />
            </Route>

            <Route path='/search' element={<PrivateRoute />}>
                <Route path="" element={<UserSearchPage />} />
            </Route>

            <Route path='/posts/new' element={<PrivateRoute />}>
                <Route path="" element={<NewPostPage />} />
            </Route>

            <Route path='/posts/:id' element={<PrivateRoute />}>
                <Route path="" element={<PostPage />} />
            </Route>

            <Route path='/posts/:id/edit' element={<PrivateRoute />}>
                <Route path="" element={<EditPostPage />} />
            </Route>

            <Route path='/posts/:id/save' element={<PrivateRoute />}>
                <Route path="" element={<SavePostPage />} />
            </Route>

            <Route path='/posts/:id/save/new' element={<PrivateRoute />}>
                <Route path="" element={<NewCollectionPage />} />
            </Route>
            
            <Route path='/collections/new' element={<PrivateRoute />}>
                <Route path="" element={<NewCollectionPage />} />
            </Route>

            <Route path='/collections/:id' element={<PrivateRoute />}>
                <Route path="" element={<CollectionPage />} />
            </Route>

            <Route path='/collections/:id/edit' element={<PrivateRoute />}>
                <Route path="" element={<EditCollectionPage />} />
            </Route>


            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};