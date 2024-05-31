import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {NextUIProvider} from "@nextui-org/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <NextUIProvider>
        <App />
        </NextUIProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
