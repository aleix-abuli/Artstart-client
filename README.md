# Artstart-client
## **React Router Routes**

| Path | Component | Permissions | Behavior |
|-----------|-----|--------------|--------|
|`/`|LandingPage|public `<Route>`| Landing page |
|`/signup`|SignUpPage|anon only `<AnonRoute>`| Signup form, link to login, navigate to feed after signup |
|`/login`|LogInPage|anon only `<AnonRoute>`| Login form, link to signup, navigate to feed after login |
|`/feed`|FeedPage|user only `<PrivateRoute>`| Homepage, shows random posts from different users |
|`/following`|FollowingPage|user only `<PrivateRoute>`| Same structure as feed, only shows posts from people user follows |
|`/genres`|GenresChoicePage|user only `<PrivateRoute>`| Allows user to choose a genre out of the available ones |
|`/genres/:genre`|GenreFeedPage|user only `<PrivateRoute>`| Same structure as feed, only shows posts from a filtered genre |
|**DOUBT** `/users/:id/posts`|UserPage, PostGrid|user only `<PrivateRoute>`| Shows a user profile and their posts, link to their likes or their collections |
|**DOUBT** `/users/:id/likes`|UserPage, PostGrid|user only `<PrivateRoute>`| Shows a user profile and their likes, link to their posts or their collections |
|**DOUBT** `/users/:id/collections`|UserPage, CollGrid|user only `<PrivateRoute>`| Shows a user profile and their collections, link to their posts or their likes |
|`/users/:id/edit`|UserEditPage|user only `<PrivateRoute>`| Allows user to update their basic info |
|`/posts/new`|NewPostPage|user only `<PrivateRoute>`| Form to create a new post |
|`/posts/:id`|PostPage|user only `<PrivateRoute>`| Shows the details of a post, as weel as the comments |
|`/posts/:id/edit`|PostEditPage|user only `<PrivateRoute>`| Allows user to update the info of one of their posts |
|`/posts/:id/save`|PostSavePage|user only `<PrivateRoute>`| Allows user to save any post to one of their own collections, or create a new one |
|`/posts/:id/save/new`|NewCollectionPage|user only `<PrivateRoute>`| Allows user to create a new collection |
|`/collections/:id`|CollectionPage|user only `<PrivateRoute>`| Details of a user's collection |
|`/collections/:id/edit`|CollectionEditPage|user only `<PrivateRoute>`| Allows user to update one of their collections|
