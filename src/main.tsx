import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './style/index.scss';

import { PostsContextProvider } from './context/PostsContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostsContextProvider>
  </React.StrictMode>,
)
