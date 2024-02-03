
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from "./Assets/Styles/GlobalStyle";
import { DataProvider } from './Assets/Data/DataContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <GlobalStyle>
        <DataProvider>      
          <App />
        </DataProvider>
      </GlobalStyle>
    </BrowserRouter>
  //</React.StrictMode>
);

reportWebVitals();
