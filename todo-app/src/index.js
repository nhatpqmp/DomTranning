// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@shopify/polaris/build/esm/styles.css'; // Thêm dòng này
import { AppProvider } from '@shopify/polaris';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider i18n={{}}>
            <App />
        </AppProvider>
    </React.StrictMode>
);
