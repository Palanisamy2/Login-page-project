import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../styles/services.css';

const WebDevelopment = () => <p>We offer modern web development services.</p>;
const MobileDevelopment = () => <p>We build high-quality mobile applications.</p>;

const ServicesPage = () => {
  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <Routes>
        <Route path="web" element={<WebDevelopment />} />
        <Route path="mobile" element={<MobileDevelopment />} />
      </Routes>
    </div>
  );
};

export default ServicesPage;
