import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Si no está en la página principal, navegar a home y luego hacer scroll
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <footer className="footer-container">
            <div className="footer-info">
                <h3 className="footer-logo">✦ BARBERÍA</h3>
                <p>Calle 93 #15-32, Bogotá</p>
                <p>Lun-Sáb 8am - 8pm</p>
                <p>+57 300 000 0000</p>
            </div>

            <div className="footer-links">
                <h4>SERVICIOS</h4>
                <ul>
                    <li><button className="footer-link-btn" onClick={() => scrollToSection('services')}>Corte Clásico</button></li>
                    <li><button className="footer-link-btn" onClick={() => scrollToSection('services')}>Corte + Barba</button></li>
                    <li><button className="footer-link-btn" onClick={() => scrollToSection('services')}>Afeitado</button></li>
                    <li><button className="footer-link-btn" onClick={() => scrollToSection('services')}>Tratamiento</button></li>
                </ul>
            </div>

            <div className="footer-links">
                <h4>BARBERÍA</h4>
                <ul>
                    <li><button className="footer-link-btn" onClick={() => scrollToSection('about')}>Nosotros</button></li>
                    <li><button className="footer-link-btn" onClick={() => scrollToSection('team')}>Nuestro equipo</button></li>
                    <li><button className="footer-link-btn" onClick={() => scrollToSection('gallery')}>Galería</button></li>
                    <li><button className="footer-link-btn" onClick={() => scrollToSection('blog')}>Blog</button></li>
                </ul>
            </div>

            <div className="footer-links">
                <h4>CUENTA</h4>
                <ul>
                    <li><button className="footer-link-btn" onClick={handleLogin}>Iniciar sesión</button></li>
                    <li><button className="footer-link-btn" onClick={handleLogin}>Registrarse</button></li>
                    <li><button className="footer-link-btn" onClick={handleLogin}>Mis citas</button></li>
                    <li><button className="footer-link-btn" onClick={() => alert('Soporte - Funcionalidad próximamente')}>Soporte</button></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;