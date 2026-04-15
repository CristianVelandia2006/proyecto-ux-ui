import React, { useState, useEffect } from 'react';

const ScheduleEditor = ({ onClose }) => {
  const [schedule, setSchedule] = useState(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']);

  // Cargar horario guardado
  useEffect(() => {
    const saved = localStorage.getItem('barberSchedule');
    if (saved) setSchedule(JSON.parse(saved));
  }, []);

  const handleUpdate = () => {
    localStorage.setItem('barberSchedule', JSON.stringify(schedule));
    alert('Horario actualizado');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Editar Horario</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '20px 0' }}>
          {schedule.map((time, index) => (
            <input 
              key={index}
              type="time" 
              value={time}
              onChange={(e) => {
                const newSchedule = [...schedule];
                newSchedule[index] = e.target.value;
                setSchedule(newSchedule);
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="wf-btn" onClick={onClose}>Cancelar</button>
          <button className="wf-btn accent" onClick={handleUpdate}>Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEditor;