import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../AppointmentContext';
import StatCard from '../StatCard';
import Booking from '../Booking';
import './UserStyles/Dashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useAppointments();
  const [currentView, setCurrentView] = useState('agenda');

  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) >= new Date());
  const totalAppointments = appointments.length;
  const favoriteBarber = appointments.length > 0 ?
    appointments.reduce((acc, apt) => {
      acc[apt.barber] = (acc[apt.barber] || 0) + 1;
      return acc;
    }, {}) : {};
  const favBarber = Object.keys(favoriteBarber).reduce((a, b) => favoriteBarber[a] > favoriteBarber[b] ? a : b, 'N/A');
  const lastVisit = appointments.length > 0 ? appointments[appointments.length - 1] : null;

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      navigate('/');
    }
  };

  const handleModificar = (appointmentId) => {
    alert('Funcionalidad de modificación próximamente disponible');
  };

  const handlePerfil = () => {
    alert('Mi Perfil: Juan García\nEmail: juan.garcia@email.com\nMiembro desde: Enero 2024');
  };

  const handleNotificaciones = () => {
    alert('Notificaciones:\n- Tu cita del 25 Feb fue confirmada\n- Recordatorio: Cita mañana a las 10:30am\n- Promoción: 20% descuento en cortes clásicos');
  };

  const handleAjustes = () => {
    alert('Ajustes:\n- Cambiar contraseña\n- Preferencias de notificación\n- Tema de la aplicación\n\nFuncionalidad próximamente disponible');
  };

  return (
    <div className="screen active" id="screen-user">
      <div className="dash-layout">
        <aside className="dash-sidebar">
          <div className="sidebar-logo">✦ Barbería</div>
          <div className="sidebar-user">
            <div className="avatar">JG</div>
            <div>
              <div className="sidebar-user-name">Juan García</div>
              <div className="sidebar-user-role">Cliente</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section-label">Principal</div>
            <div className={`nav-item ${currentView === 'agenda' ? 'active' : ''}`} onClick={() => setCurrentView('agenda')}>
              <span className="nav-icon">📅</span> Mi Agenda
            </div>
            <div className={`nav-item ${currentView === 'booking' ? 'active' : ''}`} onClick={() => setCurrentView('booking')}>
              <span className="nav-icon">➕</span> Nueva Reserva
            </div>
            <div className={`nav-item ${currentView === 'history' ? 'active' : ''}`} onClick={() => setCurrentView('history')}>
              <span className="nav-icon">🕐</span> Historial
            </div>
            <div className="nav-section-label">Cuenta</div>
            <div className="nav-item" onClick={handlePerfil}><span className="nav-icon">👤</span> Mi Perfil</div>
            <div className="nav-item" onClick={handleNotificaciones}><span className="nav-icon">🔔</span> Notificaciones</div>
            <div className="nav-item" onClick={handleAjustes}><span className="nav-icon">⚙</span> Ajustes</div>
            <div style={{ flex: 1 }}></div>
            <div className="nav-item" style={{ marginBottom: '12px' }} onClick={handleLogout}>
              <span className="nav-icon">←</span> Cerrar sesión
            </div>
          </nav>
        </aside>

        <main className="dash-main">
          <header className="dash-topbar">
            <div>
              <div className="page-title">
                {currentView === 'agenda' ? 'Mi Agenda' :
                 currentView === 'booking' ? 'Nueva Reserva' : 'Historial'}
              </div>
              <div className="page-subtitle">Lunes, 23 de febrero 2026</div>
            </div>
            {currentView === 'agenda' && (
              <button className="wf-btn accent" onClick={() => setCurrentView('booking')}>
                + Nueva reserva
              </button>
            )}
          </header>

          <div className="dash-content">
            {currentView === 'agenda' && (
              <>
                <div className="stats-row">
                  <StatCard label="Próximas citas" value={upcomingAppointments.length.toString()} subText="Esta semana" />
                  <StatCard label="Citas totales" value={totalAppointments.toString()} subText="Historial total" />
                  <StatCard
                    label="Barbero favorito"
                    value={favBarber}
                    subText={`${favoriteBarber[favBarber] || 0} visitas`}
                    customStyle={{ fontSize: '18px', marginTop: '4px' }}
                  />
                  <StatCard
                    label="Última visita"
                    value={lastVisit ? `${lastVisit.service} con ${lastVisit.barber}` : 'Sin visitas'}
                    subText={lastVisit ? `Hace ${Math.floor((new Date() - new Date(lastVisit.date)) / (1000 * 60 * 60 * 24))} días` : ''}
                    customStyle={{ fontSize: '18px', marginTop: '4px' }}
                  />
                </div>

                <div className="three-col">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Citas Programadas</div>
                      <div style={{ fontSize: '10px', color: 'var(--gray2)' }}>Feb 2026</div>
                    </div>
                    <div className="card-body">
                      {upcomingAppointments.length > 0 ? (
                        <>
                          <div className="appt-featured">
                            <div className="featured-label">PRÓXIMA CITA</div>
                            <div className="featured-title">{upcomingAppointments[0].service}</div>
                            <div className="featured-sub">{upcomingAppointments[0].barber}</div>
                            <div className="featured-footer">
                              <div className="featured-date">
                                {new Date(upcomingAppointments[0].date).toLocaleDateString('es-ES', {
                                  weekday: 'long',
                                  day: 'numeric',
                                  month: 'short'
                                })} — {upcomingAppointments[0].time}
                              </div>
                              <div className="appt-badge badge-confirmed">{upcomingAppointments[0].status}</div>
                            </div>
                            <div className="featured-actions">
                              <button className="mini-btn" onClick={() => handleModificar(upcomingAppointments[0].id)}>Modificar</button>
                              <button className="mini-btn danger" onClick={() => cancelAppointment(upcomingAppointments[0].id)}>
                                Cancelar
                              </button>
                            </div>
                          </div>

                          {upcomingAppointments.slice(1).map(apt => (
                            <div className="appt-row" key={apt.id}>
                              <div className="appt-time">{new Date(apt.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</div>
                              <div className="appt-info">
                                <div className="appt-name">{apt.service}</div>
                                <div className="appt-service">{apt.barber} — {apt.time}</div>
                              </div>
                              <div className="appt-badge badge-pending">{apt.status}</div>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p>No tienes citas programadas.</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentView === 'booking' && <Booking />}

            {currentView === 'history' && (
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Historial de Citas</div>
                </div>
                <div className="card-body">
                  {appointments.length > 0 ? (
                    appointments.map(apt => (
                      <div className="appt-row" key={apt.id}>
                        <div className="appt-time">{new Date(apt.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</div>
                        <div className="appt-info">
                          <div className="appt-name">{apt.service}</div>
                          <div className="appt-service">{apt.barber} — {apt.time}</div>
                        </div>
                        <div className="appt-badge badge-confirmed">{apt.status}</div>
                      </div>
                    ))
                  ) : (
                    <p>No tienes citas en el historial.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;