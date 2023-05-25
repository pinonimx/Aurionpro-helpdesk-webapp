import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import { configureFakeBackend } from './_helpers';
  
const domNode = document.getElementById('root');
const root = createRoot(domNode);

// configureFakeBackend();
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);