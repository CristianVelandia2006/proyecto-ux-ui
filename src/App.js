import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/LandingPage/Navbar';
import Hero from './components/LandingPage/Hero';
import Services from './components/LandingPage/Service';
import Barber from './components/LandingPage/Barber';
import CallBarber from './components/LandingPage/CallBarber';
import Footer from './components/LandingPage/Footer';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta principal: Muestra Navbar y Hero */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Services />
              <Barber />
              <CallBarber />
              <Footer />
            </>
          } />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;