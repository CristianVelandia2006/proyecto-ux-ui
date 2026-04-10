import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CallBarber.css';

const CallBarber = () => {
    const navigate = useNavigate();

    const handleReservarCita = () => {
        navigate('/login');
    };

    return (
        <section className="cta-container">
            <div className="cta-text">
                <h2 className="cta-title">¿Listo para tu próximo corte?</h2>
                <p className="cta-subtitle">Agenda en menos de 2 minutos &nbsp;•&nbsp; Sin tarjeta de crédito</p>
            </div>
            <button className="cta-button" onClick={handleReservarCita}>RESERVAR MI CITA →</button>
        </section>
    );
};

export default CallBarber;