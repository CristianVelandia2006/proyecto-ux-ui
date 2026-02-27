import React from 'react';
import './Barber.css';

const Barbers = () => {
    const barbersList = [
        { id: 1, name: 'Carlos Mendoza', specialty: 'Especialista en Fade & Barba', rating: 4.9 },
        { id: 2, name: 'Andrés Ruiz', specialty: 'Corte Clásico & Moderno', rating: 4.8 },
        { id: 3, name: 'Miguel Torres', specialty: 'Afeitado & Tratamientos', rating: 4.7 },
    ];

    return (
        <section className="barbers-container">
            <h2 className="barbers-title">Nuestros Barberos</h2>
            <p className="barbers-subtitle">03 expertos</p>
            <div className="barbers-grid">
                {barbersList.map(barber => (
                    <div className="barber-card" key={barber.id}>
                        {/* Contenedor de la foto */}
                        <div className="barber-photo-placeholder">
                            <span>FOTO BARBERO</span>
                        </div>
                        
                        {/* Info del barbero */}
                        <div className="barber-info">
                            <h3 className="barber-name">{barber.name}</h3>
                            <p className="barber-specialty">{barber.specialty}</p>
                            <div className="barber-rating">
                                {'★'.repeat(Math.floor(barber.rating))} 
                                {'☆'.repeat(5 - Math.floor(barber.rating))}
                                <span> - {barber.rating}</span>
                            </div>
                            <button className="barber-btn">VER DISPONIBILIDAD</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Barbers;