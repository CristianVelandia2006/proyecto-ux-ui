import React from 'react';
import './CallBarber.css';

const CallBarber = () => {
    return (
        <section className="cta-container">
            <div className="cta-text">
                <h2 className="cta-title">¿Listo para tu próximo corte?</h2>
                <p className="cta-subtitle">Agenda en menos de 2 minutos &nbsp;•&nbsp; Sin tarjeta de crédito</p>
            </div>
            <button className="cta-button">RESERVAR MI CITA →</button>
        </section>
    );
};

export default CallBarber;