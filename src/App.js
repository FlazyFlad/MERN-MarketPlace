import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeContext } from './Context';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductLIst';
import Catalog from './components/Catalog/Catalog';

function App() {
  const [theme, setTheme] = useState(true);

  const handleChangeTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };


  return (
    <>
      <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
        <div className={`app-container ${theme ? 'dark-background' : 'light-background'}`}>
          <Header />
          <div className={`app-spacer ${theme ? 'dark-background' : 'light-background'}`}>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />

              <Route path="catalog" element={<Catalog />} />
            </Routes>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
