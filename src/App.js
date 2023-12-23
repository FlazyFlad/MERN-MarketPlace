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
import HeroSection from './components/HeroSection/HeroSection';
import AboutUs from './components/AboutUs/AboutUs';

function App() {
  const [theme, setTheme] = useState(true);
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

  const handleChangeTheme = () => {
    setTheme(prevTheme => !prevTheme);
  };

  const isAuthenticated = useSelector((state) => (state.auth.isAuthenticated))

  useEffect(() => {
    console.log(isAuthenticated)
  }, []);

  return (
    <>

      <div className={`${isCartNavOpen | isOrderOpen | isOrderDetailsOpen | isOrderSuccessOpen | isFavoriteNavOpen ? 'cover' : ''}`}></div>
      <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
        <div className={`app-container ${theme ? 'dark-background' : 'light-background'}`}>
          <Header />
          <AuthModal />
          <div className={`app-spacer ${theme ? 'dark-background' : 'light-background'} overlay ${isCartNavOpen ? 'open' : ''}`} style={{ display: 'block' }}>
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<HeroSection />} />
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
