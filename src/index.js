import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import ThemeContextWrapper from './components/themeContextWrapper/themeContextWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContextWrapper>
    <App />
  </ThemeContextWrapper>
  
);


