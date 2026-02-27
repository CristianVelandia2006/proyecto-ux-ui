import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-container">
            <div className="hero-content">
                <h1 className="h1-hero">Tu estilo, <br></br> nuestra <br></br> precision.</h1>
                <p className="p-hero">Cortes clásicos y modernos con los mejores maestros barberos. Reserva tu cita en minutos.</p>
                <div className="hero-buttons">
                    <button className="hero-button" id="btn-reservar-hero">RESERVAR AHORA</button>
                    <button className="hero-button" id="btn-ver-servicios">VER SERVICIOS</button>
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