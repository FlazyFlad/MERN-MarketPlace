import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeContext } from './Context';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductLIst';
import Catalog from './components/Catalog/Catalog';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [theme, setTheme] = useState(true);
  const isCartNavOpen = useSelector((state) => state.cart.isCartNavOpen);
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };


  return (
    <>
      <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
        <div className={`app-container ${theme ? 'dark-background' : 'light-background'}`}>
        <div className={`${isCartNavOpen ? 'cover' : ''}`}></div>
          <Header />
          <div className={`app-spacer ${theme ? 'dark-background' : 'light-background'} overlay ${isCartNavOpen ? 'open' : ''}`}  style={{ display: 'block' }}>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/catalog" element={<Catalog />} />
            </Routes>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
