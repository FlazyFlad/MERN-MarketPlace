import './App.css';
import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeContext } from './Context';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductLIst';
import Catalog from './components/Catalog/Catalog';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import AuthModal from './components/AuthModal/AuthModal';
import Cookies from 'js-cookie';
import AboutUs from './components/AboutUs/AboutUs';
import MainPage from './components/Main/Main';
import Navbar from './components/Navbar/Navbar';
import About from './components/AboutUs/AboutUs';

function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme")
    ? localStorage.getItem("theme") : "light"
  );

  const isCartNavOpen = useSelector((state) => state.cart.isCartNavOpen);
  const isOrderOpen = useSelector((state) => state.cart.isOrderOpen);
  const isOrderDetailsOpen = useSelector((state) => (state.cart.isOrderDetailsOpen));
  const isOrderSuccessOpen = useSelector((state) => (state.cart.isOrderSuccessOpen));
  const isFavoriteNavOpen = useSelector((state) => (state.favorite.isFavoriteNavOpen));

  const RequireAuth = ({ children }) => {
    const isAuthenticated = !!Cookies.get('token_data');
    const location = useLocation();

    return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
  };

  const element = document.documentElement; // access to html

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      element.classList.add("dark");
      element.classList.add("dark");
    } else {
      element.classList.remove("light");
      element.classList.remove("dark");
    }
  });


  const isAuthenticated = useSelector((state) => (state.auth.isAuthenticated))

  useEffect(() => {
    console.log(isAuthenticated)
  }, []);

  return (
    <>

      <div className={`${isCartNavOpen | isOrderOpen | isOrderDetailsOpen | isOrderSuccessOpen | isFavoriteNavOpen ? 'cover' : ''}`}></div>
      <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
        <div className={`app-container ${theme === "dark" ? 'dark-background' : 'light-background'}`}>
          <Navbar />

          <AuthModal />
          <div className={`app-spacer ${theme === "dark" ? 'dark-background' : 'light-background'} overlay ${isCartNavOpen ? 'open' : ''}`} style={{ display: 'block' }}>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/about-us" element={<About />} />
            </Routes>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
