import React from 'react';
import reactDom from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <AuthProviderWrapper>
                <App />
            </AuthProviderWrapper>
        </Router>
    </React.StrictMode>
    , document.getElementById('root')
);
