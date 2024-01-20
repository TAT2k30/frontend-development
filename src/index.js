import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from "./Assets/Styles/GlobalStyle";
import DataProvider from './Assets/Data/DataContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <DataProvider>
        <App />
      </DataProvider>
    </GlobalStyle>
  </React.StrictMode>
);
reportWebVitals();
