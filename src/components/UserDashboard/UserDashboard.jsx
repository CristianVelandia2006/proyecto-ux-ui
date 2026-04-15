import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../AppointmentContext';
import StatCard from '../StatCard';
import Booking, { servicePrices } from '../Booking';
import './UserStyles/Dashboard.css';

// --- COMPONENTE EDITOR DE HORARIO ---
const ScheduleEditor = ({ onClose }) => {
  const [schedule, setSchedule] = useState(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30']);

  useEffect(() => {
    const saved = localStorage.getItem('barberSchedule');
    if (saved) setSchedule(JSON.parse(saved));
  }, []);

  const handleUpdate = () => {
    localStorage.setItem('barberSchedule', JSON.stringify(schedule));
    alert('Horario actualizado con éxito');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Editar Horario</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '20px 0' }}>
          {schedule.map((time, index) => (
            <input key={index} type="time" value={time} onChange={(e) => {
              const newSchedule = [...schedule];
              newSchedule[index] = e.target.value;
              setSchedule(newSchedule);
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="wf-btn" onClick={onClose}>Cancelar</button>
          <button className="wf-btn accent" onClick={handleUpdate}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useAppointments();
  const [currentView, setCurrentView] = useState('agenda');
  const [currentUser, setCurrentUser] = useState(null);

  // Estados para el Modal de cancelación
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  
  // Estado para el editor de horario
  const [showSchedule, setShowSchedule] = useState(false);

  // Cargar el usuario del localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // --- LÓGICA RF-10: CALCULAR SALDO ---
  const calculateBalance = () => {
    if (!currentUser || currentUser.role !== 'barber') return 0;
    // Filtramos citas confirmadas de este barbero y sumamos según precios
    const myAppointments = appointments.filter(apt => apt.barber === currentUser.username && apt.status === 'Confirmado');
    return myAppointments.reduce((sum, apt) => sum + (servicePrices[apt.service] || 0), 0);
  };

  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) >= new Date());
  const totalAppointments = appointments.length;

  const favoriteBarber = appointments.length > 0 ?
    appointments.reduce((acc, apt) => {
      acc[apt.barber] = (acc[apt.barber] || 0) + 1;
      return acc;
    }, {}) : {};

  const favBarber = Object.keys(favoriteBarber).reduce((a, b) => favoriteBarber[a] > favoriteBarber[b] ? a : b, 'N/A');
  const lastVisit = appointments.length > 0 ? appointments[appointments.length - 1] : null;

  // Lógica del modal de cancelación
  const handleOpenCancelModal = (id) => {
    setAppointmentToCancel(id);
    setShowCancelModal(true);
  };

  const handleConfirmarCancelacion = () => {
    if (!cancellationReason.trim()) {
      alert('Por favor, ingresa un motivo para la cancelación.');
      return;
    }
    cancelAppointment(appointmentToCancel);
    setShowCancelModal(false);
    setCancellationReason('');
    setAppointmentToCancel(null);
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      localStorage.removeItem('currentUser');
      navigate('/');
    }
  };

  const handleModificar = (appointmentId) => {
    alert('Funcionalidad de modificación próximamente disponible');
  };

  const handlePerfil = () => {
    alert(`Mi Perfil: ${currentUser?.username || 'Usuario'}\nEmail: ${currentUser?.email || 'N/A'}`);
  };

  const handleNotificaciones = () => {
    alert('Notificaciones:\n- Tu cita del 25 Feb fue confirmada\n- Recordatorio: Cita mañana a las 10:30am');
  };

  const handleAjustes = () => {
    alert('Ajustes:\n- Cambiar contraseña\n- Preferencias de notificación\n\nFuncionalidad próximamente disponible');
  };

  return (
    <div className="screen active" id="screen-user">
      <div className="dash-layout">
        <aside className="dash-sidebar">
          <div className="sidebar-logo">✦ Barbería</div>
          <div className="sidebar-user">
            <div className="sidebar-user-name">
              {currentUser ? currentUser.username : 'Cargando...'}
            </div>
            <div>
              <div className="sidebar-user-role">
                {currentUser ? currentUser.role : 'Cargando...'}
              </div>
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
            
            {/* BOTÓN DE HORARIO SOLO PARA BARBERO */}
            {currentUser?.role === 'barber' && (
              <div className="nav-item" onClick={() => setShowSchedule(true)}>
                <span className="nav-icon">⏰</span> Mi Horario
              </div>
            )}

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
                  {/* --- NUEVA TARJETA DE SALDO (RF-10) --- */}
                  {currentUser?.role === 'barber' && (
                    <StatCard 
                      label="Saldo Acumulado" 
                      value={`$${calculateBalance().toLocaleString()}`} 
                      subText="Total de saldo por servicios confirmados" 
                      customStyle={{ fontSize: '18px', marginTop: '4px', borderColor: '#d4af37' }} 
                    />
                  )}
                  <StatCard label="Próximas citas" value={upcomingAppointments.length.toString()} subText="Esta semana" />
                  <StatCard label="Citas totales" value={totalAppointments.toString()} subText="Historial total" />
                  <StatCard label="Barbero favorito" value={favBarber} subText={`${favoriteBarber[favBarber] || 0} visitas`} customStyle={{ fontSize: '18px', marginTop: '4px' }} />
                </div>

                <div className="three-col">
                  <div className="card">
                    <div className="card-header">
                      <div className="card-title">Citas Programadas</div>
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
                                {new Date(upcomingAppointments[0].date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })} — {upcomingAppointments[0].time}
                              </div>
                              <div className="appt-badge badge-confirmed">{upcomingAppointments[0].status}</div>
                            </div>
                            <div className="featured-actions">
                              <button className="mini-btn" onClick={() => handleModificar(upcomingAppointments[0].id)}>Modificar</button>
                              <button className="mini-btn danger" onClick={() => handleOpenCancelModal(upcomingAppointments[0].id)}>Cancelar</button>
                            </div>
                          </div>
                          {upcomingAppointments.slice(1).map(apt => (
                            <div className="appt-row" key={apt.id}>
                              <div className="appt-time">{new Date(apt.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</div>
                              <div className="appt-info">
                                <div className="appt-name">{apt.service}</div>
                                <div className="appt-service">{apt.barber} — {apt.time}</div>
                              </div>
                              <div className="appt-badge badge-pending">
                                <button className="mini-btn danger" onClick={() => handleOpenCancelModal(apt.id)}>Cancelar</button>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : <p>No tienes citas programadas.</p>}
                    </div>
                  </div>
                </div>
              </>
            )}
            {currentView === 'booking' && <Booking />}
            {currentView === 'history' && (
              <div className="card">
                <div className="card-header"><div className="card-title">Historial de Citas</div></div>
                <div className="card-body">
                  {appointments.length > 0 ? appointments.map(apt => (
                    <div className="appt-row" key={apt.id}>
                      <div className="appt-time">{new Date(apt.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</div>
                      <div className="appt-info">
                        <div className="appt-name">{apt.service}</div>
                        <div className="appt-service">{apt.barber} — {apt.time}</div>
                      </div>
                      <div className="appt-badge badge-confirmed">{apt.status}</div>
                    </div>
                  )) : <p>No tienes citas en el historial.</p>}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL CANCELACIÓN */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Cancelar Cita</h3>
            <p>Por favor, indica el motivo de la cancelación:</p>
            <textarea 
              className="form-input-styled"
              rows="4"
              placeholder="Escribe el motivo aquí..."
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              style={{ width: '100%', margin: '15px 0' }}
            />
            <div className="form-actions" style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="wf-btn" onClick={() => setShowCancelModal(false)}>Volver</button>
              <button className="wf-btn accent" onClick={handleConfirmarCancelacion}>Confirmar Cancelación</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HORARIO */}
      {showSchedule && <ScheduleEditor onClose={() => setShowSchedule(false)} />}
    </div>
  );
};

export default UserDashboard;