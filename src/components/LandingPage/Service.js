import React from 'react';
import './Service.css';

const Service = () => {
    const servicesList = [
        { id: 1, icon: '✂️', title: 'Corte Clásico', price: '$25.000', time: '30 min' },
        { id: 2, icon: '🧔', title: 'Corte + Barba', price: '$45.000', time: '50 min' },
        { id: 3, icon: '🪒', title: 'Afeitado Navaja', price: '$35.000', time: '40 min' },
        { id: 4, icon: '💆', title: 'Tratamiento Facial', price: '$30.000', time: '35 min' },
    ];

    return (
        <section className="services-container">
            <h2 className="services-title">Nuestros Servicios</h2>
            <p className="services-subtitle">04 servicios disponibles</p>
            <div className="services-grid">
                {servicesList.map(service => (
                    <div className="service-card" key={service.id}>
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-name">{service.title}</h3>
                        <p className="service-price">{service.price}</p>
                        <p className="service-time">⏱ {service.time}</p>
                        <button className="service-btn">RESERVAR</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Service;