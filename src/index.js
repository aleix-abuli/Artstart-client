import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';
import { FeedProviderWrapper } from './context/feed.context';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthProviderWrapper>
                <FeedProviderWrapper>
                    <App />
                </FeedProviderWrapper>
            </AuthProviderWrapper>
        </Router>
    </React.StrictMode>
    , document.getElementById('root')
);
