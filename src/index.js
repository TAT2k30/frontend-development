
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from "./Assets/Styles/GlobalStyle";
import { DataProvider } from './Assets/Data/DataContext';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './Services/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <GlobalStyle>
        <ErrorBoundary>
        <DataProvider>      
          <App />
        </DataProvider>
        </ErrorBoundary>
      </GlobalStyle>
    </BrowserRouter>
  //</React.StrictMode>
);

reportWebVitals();
