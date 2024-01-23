import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from "./Assets/Styles/GlobalStyle";
import { DataProvider } from './Assets/Data/DataContext';
import { BrowserRouter } from 'react-router-dom';
import Header from './Layouts/Header/Header';
import Footer from './Layouts/Footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle>
        <DataProvider>
          <Header/>
          <App />
          <Footer/>
        </DataProvider>
      </GlobalStyle>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
