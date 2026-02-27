import React from 'react';
import StatCard from '../StatCard'; 
import '../UserDashboard/UserStyles/Dashboard.css'; // Usamos tu CSS base

const BarberoDashboard = () => {
  return (
    <div className="screen active" id="screen-barbero">
      <div className="dash-layout">
        {/* SIDEBAR - Versión Barbero */}
        <aside className="dash-sidebar">
          <div className="sidebar-logo">✦ Barbería Admin</div>
          <div className="sidebar-user">
            <div className="avatar" style={{ background: 'var(--accent)', fontWeight: 'bold' }}>CM</div>
            <div>
              <div className="sidebar-user-name">Carlos Mendoza</div>
              <div className="sidebar-user-role">Barbero Senior</div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section-label">GESTIÓN</div>
            <div className="nav-item active"><span className="nav-icon">📋</span> Mis Citas</div>
            <div className="nav-item"><span className="nav-icon">📅</span> Mi Agenda</div>
            <div className="nav-item"><span className="nav-icon">⏳</span> Disponibilidad</div>
            
            <div className="nav-section-label">NEGOCIO</div>
            <div className="nav-item"><span className="nav-icon">📊</span> Estadísticas</div>
            <div className="nav-item"><span className="nav-icon">👥</span> Mis Clientes</div>
            
            <div className="nav-section-label">CUENTA</div>
            <div className="nav-item"><span className="nav-icon">👤</span> Perfil</div>
            <div className="nav-item"><span className="nav-icon">⚙</span> Ajustes</div>
            
            <div style={{ flex: 1 }}></div>
            <div className="nav-item" style={{ marginBottom: '12px' }}>
              <span className="nav-icon">←</span> Cerrar sesión
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="dash-main">
          <header className="dash-topbar">
            <div>
              <div className="page-title">Panel de Control</div>
              <div className="page-subtitle">Lunes, 23 de febrero 2026 — <span style={{color: '#3a8a4e'}}>● Online</span></div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className="wf-btn">Bloquear Hora</button>
                <button className="wf-btn accent">+ Añadir Cita</button>
            </div>
          </header>

          <div className="dash-content">
            {/* STATS ROW - Datos de Barbero */}
            <div className="stats-row">
              <StatCard label="Citas para hoy" value="6" subText="2 pendientes" />
              <StatCard label="Ingresos Hoy" value="$185k" subText="Estimado total" />
              <StatCard
                label="Valoración"
                value="4.9 ★"
                subText="128 reseñas"
                customStyle={{ color: 'var(--accent)' }}
              />
              <StatCard
                label="Tiempo Promedio"
                value="45 min"
                subText="Por servicio"
              />
            </div>

            <div className="three-col">
              {/* COLUMNA IZQUIERDA: GESTIÓN DE CITAS */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Citas de la Mañana</div>
                  <div style={{ fontSize: '10px', color: 'var(--gray2)' }}>Feb 23</div>
                </div>
                <div className="card-body">
                  {/* PRÓXIMO CLIENTE */}
                  <div className="appt-featured" style={{ borderLeft: '4px solid var(--accent)' }}>
                    <div className="featured-label">SIGUIENTE CLIENTE</div>
                    <div className="featured-title">Andrés García</div>
                    <div className="featured-sub">Corte Clásico + Barba Navaja</div>
                    <div className="featured-footer">
                      <div className="featured-date">Hoy — 10:30am (En 15 min)</div>
                      <div className="appt-badge badge-confirmed">Confirmado</div>
                    </div>
                    <div className="featured-actions">
                      <button className="mini-btn accent">Iniciar Servicio</button>
                      <button className="mini-btn">No asistió</button>
                    </div>
                  </div>

                  {/* LISTA DE CITAS */}
                  <div className="appt-row">
                    <div className="appt-time">11:30 AM</div>
                    <div className="appt-info">
                      <div className="appt-name">Juan Pérez</div>
                      <div className="appt-service">Degradado Moderno</div>
                    </div>
                    <div className="appt-badge badge-confirmed">Pagado</div>
                  </div>

                  <div className="appt-row">
                    <div className="appt-time">12:15 PM</div>
                    <div className="appt-info">
                      <div className="appt-name">Marcos Díaz</div>
                      <div className="appt-service">Perfilado de Cejas</div>
                    </div>
                    <div className="appt-badge badge-pending">Espera</div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: AGENDA Y NOTAS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* CALENDARIO SEMANAL CORTO */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Disponibilidad Semanal</div>
                  </div>
                  <div className="card-body">
                    <div className="mini-calendar">
                        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(d => <div key={d} className="cal-header">{d}</div>)}
                        <div className="cal-day today">23</div>
                        <div className="cal-day has-appt">24</div>
                        <div className="cal-day has-appt">25</div>
                        <div className="cal-day">26</div>
                        <div className="cal-day has-appt">27</div>
                        <div className="cal-day">28</div>
                        <div className="cal-day">1</div>
                    </div>
                    <div className="cal-legend" style={{marginTop: '10px'}}>
                        <div className="legend-item"><span className="dot black"></span> Full</div>
                        <div className="legend-item"><span className="dot outline"></span> Libre</div>
                    </div>
                  </div>
                </div>

                {/* NOTIFICACIONES DE ÚLTIMO MINUTO */}
                <div className="card">
                  <div className="card-header"><div className="card-title">Alertas de Agenda</div></div>
                  <div className="card-body">
                    <div className="notif">
                      <div className="notif-dot active"></div>
                      <div className="notif-content">
                        <p><strong>Cancelación:</strong> Roberto Ruiz (2:00 PM)</p>
                        <span>Hace 5 min — Espacio liberado</span>
                      </div>
                    </div>
                    <div className="notif">
                      <div className="notif-dot active" style={{background: '#3a8a4e'}}></div>
                      <div className="notif-content">
                        <p><strong>Nueva Cita:</strong> Luis M. (Mañana 9:00 AM)</p>
                        <span>Hace 20 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN: BLOQUEO DE HORAS (Sustituye al flujo de reserva del cliente) */}
            <div className="card" style={{ marginTop: '24px' }}>
              <div className="card-header">
                <div className="card-title">⚙ CONFIGURAR MI DISPONIBILIDAD</div>
                <div style={{ fontSize: '10px', color: 'var(--gray2)', letterSpacing: '0.1em' }}>MÓDULO DE BLOQUEO</div>
              </div>
              <div className="card-body">
                <div className="booking-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">FECHA A MODIFICAR</label>
                      <input type="text" className="form-input-styled" defaultValue="23 / 02 / 2026" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">TIPO DE BLOQUEO</label>
                      <div className="custom-select">Tiempo de Almuerzo / Descanso</div>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="wf-btn">DESCARTAR</button>
                    <button className="wf-btn filled">BLOQUEAR HORARIO SELECCIONADO</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BarberoDashboard;