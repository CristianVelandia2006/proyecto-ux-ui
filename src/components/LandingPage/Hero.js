import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const navigate = useNavigate();

    const handleReservarAhora = () => {
        navigate('/login');
    };

    const handleVerServicios = () => {
        // Scroll to services section
        const servicesSection = document.getElementById('servicios');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero-container">
            <div className="hero-content">
                <h1 className="h1-hero">Tu estilo, <br></br> nuestra <br></br> precision.</h1>
                <p className="p-hero">Cortes clásicos y modernos con los mejores maestros barberos. Reserva tu cita en minutos.</p>
                <div className="hero-buttons">
                    <button className="hero-button" id="btn-reservar-hero" onClick={handleReservarAhora}>RESERVAR AHORA</button>
                    <button className="hero-button" id="btn-ver-servicios" onClick={handleVerServicios}>VER SERVICIOS</button>
                </div>
            </div>

            <div className="hero-img-container">
                <img src="/Barber_In_Actions.webp" className="hero-img" alt="Barbero en acción " />
                <span>BARBERO EN ACCIÓN</span>
            </div>

        </section>
    );
};

export default Hero;