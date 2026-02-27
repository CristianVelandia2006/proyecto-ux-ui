import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Service';
import Barber from './sections/Barber';
import CallBarber from './sections/CallBarber';
import Footer from './sections/Footer';
import UserDashboard from './components/UserDashboard/UserDashboard';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;