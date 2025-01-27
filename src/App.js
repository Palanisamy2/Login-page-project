import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ChangePassword from './components/ChangePassword';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/styles.css';
import Footer from './components/Footer';
import UserDashboard from './components/UserDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>

    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/user-dashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn}><UserDashboard /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <AboutPage /> </ProtectedRoute> } />
        <Route path="/services/*" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <ServicesPage /> </ProtectedRoute>} />
      </Routes>
        <Footer />
    </Router>
        <ToastContainer />
    </>
  );
};

export default App;
