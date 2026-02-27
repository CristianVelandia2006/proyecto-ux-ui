// src/components/UserDashboard/UserDashboard.jsx
import React from 'react';
import StatCard from '../StatCard'; // Ajusta la ruta según tu estructura
import './UserStyles/Dashboard.css'; // Asegura que la ruta al CSS sea correcta

const UserDashboard = () => {
  return (
    <div className="screen active" id="screen-user">
      {/* Eliminamos la etiqueta de wireframe para un diseño más limpio */}

      <div className="dash-layout">
        {/* SIDEBAR - Panel lateral de navegación */}
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
            <div className="nav-item active"><span className="nav-icon">📅</span> Mi Agenda</div>
            <div className="nav-item"><span className="nav-icon">➕</span> Nueva Reserva</div>
            <div className="nav-item"><span className="nav-icon">🕐</span> Historial</div>
            <div className="nav-section-label">Cuenta</div>
            <div className="nav-item"><span className="nav-icon">👤</span> Mi Perfil</div>
            <div className="nav-item"><span className="nav-icon">🔔</span> Notificaciones</div>
            <div className="nav-item"><span className="nav-icon">⚙</span> Ajustes</div>
            <div style={{ flex: 1 }}></div>
            <div className="nav-item" style={{ marginBottom: '12px' }}>
              <span className="nav-icon">←</span> Cerrar sesión
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT - Área de contenido principal */}
        <main className="dash-main">
          <header className="dash-topbar">
            <div>
              <div className="page-title">Mi Agenda</div>
              <div className="page-subtitle">Lunes, 23 de febrero 2026</div>
            </div>
            <button className="wf-btn accent">+ Nueva reserva</button>
          </header>

          <div className="dash-content">
            {/* STATS ROW - Fila de tarjetas de estadísticas */}
            <div className="stats-row">
              <StatCard label="Próximas citas" value="2" subText="Esta semana" />
              <StatCard label="Citas totales" value="14" subText="Historial total" />
              <StatCard
                label="Barbero favorito"
                value="Carlos M."
                subText="8 visitas"
                customStyle={{ fontSize: '18px', marginTop: '4px' }}
              />
              <StatCard
                label="Última visita"
                value="Hace 18 días"
                subText="Corte Clásico"
                customStyle={{ fontSize: '18px', marginTop: '4px' }}
              />
            </div>

            {/* SECCIÓN DE CITAS Y CALENDARIO - Placeholder */}
            <div className="three-col">
              {/* COLUMNA IZQUIERDA: CITAS PROGRAMADAS */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Citas Programadas</div>
                  <div style={{ fontSize: '10px', color: 'var(--gray2)' }}>Feb 2026</div>
                </div>
                <div className="card-body">
                  {/* CITA DESTACADA (La negra) */}
                  <div className="appt-featured">
                    <div className="featured-label">PRÓXIMA CITA</div>
                    <div className="featured-title">Corte Clásico + Barba</div>
                    <div className="featured-sub">Carlos Mendoza</div>
                    <div className="featured-footer">
                      <div className="featured-date">Miércoles 25 Feb — 10:30am</div>
                      <div className="appt-badge badge-confirmed">Confirmado</div>
                    </div>
                    <div className="featured-actions">
                      <button className="mini-btn">Modificar</button>
                      <button className="mini-btn danger">Cancelar</button>
                    </div>
                  </div>

                  {/* OTRAS CITAS */}
                  <div className="appt-row">
                    <div className="appt-time">Mar 4</div>
                    <div className="appt-info">
                      <div className="appt-name">Afeitado Navaja</div>
                      <div className="appt-service">Andrés Ruiz — 3:00 pm</div>
                    </div>
                    <div className="appt-badge badge-pending">Pendiente</div>
                  </div>

                  <div className="appt-row">
                    <div className="appt-time">Mar 15</div>
                    <div className="appt-info">
                      <div className="appt-name">Corte Clásico</div>
                      <div className="appt-service">Carlos Mendoza — 11:00am</div>
                    </div>
                    <div className="appt-badge badge-confirmed">Confirmado</div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: CALENDARIO + NOTIF */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* MINI CALENDARIO */}
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Febrero 2026</div>
                    <div className="cal-nav">
                      <button className="mini-btn">‹</button>
                      <button className="mini-btn">›</button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="mini-calendar">
                      {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(d => <div key={d} className="cal-header">{d}</div>)}
                      {/* Espacios vacíos mes anterior */}
                      <div className="cal-day other-month"></div><div className="cal-day other-month"></div><div className="cal-day other-month"></div><div className="cal-day other-month"></div>
                      {/* Días del mes */}
                      {[...Array(28)].map((_, i) => (
                        <div key={i} className={`cal-day ${i + 1 === 24 ? 'today' : ''} ${i + 1 === 25 ? 'has-appt' : ''}`}>
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="cal-legend">
                      <div className="legend-item"><span className="dot black"></span> Hoy</div>
                      <div className="legend-item"><span className="dot outline"></span> Con cita</div>
                    </div>
                  </div>
                </div>

                {/* NOTIFICACIONES */}
                <div className="card">
                  <div className="card-header"><div className="card-title">Notificaciones</div></div>
                  <div className="card-body">
                    <div className="notif">
                      <div className="notif-dot active"></div>
                      <div className="notif-content">
                        <p>Tu cita del 25 Feb fue confirmada por Carlos.</p>
                        <span>Hace 2 horas</span>
                      </div>
                    </div>
                    <div className="notif read">
                      <div className="notif-dot"></div>
                      <div className="notif-content">
                        <p>Recuerda tu cita mañana a las 10:30am.</p>
                        <span>Ayer, 8:00pm</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN: FLUJO DE NUEVA RESERVA */}
            <div className="card" style={{ marginTop: '24px' }}>
              <div className="card-header">
                <div className="card-title">✦ NUEVA RESERVA — FLUJO DE RESERVA</div>
                {/* Corregido: letterSpacing */}
                <div style={{ fontSize: '10px', color: 'var(--gray2)', letterSpacing: '0.1em' }}>3 PASOS</div>
              </div>

              <div className="card-body">
                {/* TABS DE PROGRESO */}
                <div className="booking-steps">
                  <div className="step-tab active">01 — SERVICIO & BARBERO</div>
                  <div className="step-tab">02 — FECHA & HORA</div>
                  <div className="step-tab">03 — CONFIRMAR</div>
                </div>

                {/* FORMULARIO DE RESERVA */}
                <div className="booking-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">SERVICIO</label>
                      <div className="custom-select">Corte Clásico — $25.000</div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">BARBERO</label>
                      <div className="custom-select">Carlos Mendoza ★ 4.9</div>
                    </div>
                  </div>

                  <div className="form-row" style={{ marginTop: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">FECHA</label>
                      <input type="text" className="form-input-styled" defaultValue="25 / 02 / 2026" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">HORA DISPONIBLE</label>
                      <div className="custom-select">10:30 AM</div>
                    </div>
                  </div>

                  {/* BOTONES DE ACCIÓN */}
                  <div className="form-actions">
                    <button className="wf-btn">CANCELAR</button>
                    <button className="wf-btn accent">CONFIRMAR RESERVA →</button>
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

export default UserDashboard;