import React, { useState } from 'react';
import { useAppointments } from '../AppointmentContext';
import './Booking.css';

const Booking = () => {
  const { addAppointment } = useAppointments();
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const barbers = [
    { id: 1, name: 'Carlos Mendoza', specialty: 'Especialista en Fade & Barba' },
    { id: 2, name: 'Andrés Ruiz', specialty: 'Corte Clásico & Moderno' },
    { id: 3, name: 'Miguel Torres', specialty: 'Afeitado & Tratamientos' },
  ];

  const services = [
    'Corte Clásico',
    'Corte Moderno',
    'Afeitado Navaja',
    'Barba',
    'Corte + Barba',
    'Tratamiento Facial'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBarber || !selectedService || !selectedDate || !selectedTime) {
      alert('Por favor completa todos los campos');
      return;
    }

    const barber = barbers.find(b => b.id === parseInt(selectedBarber));
    const appointment = {
      barber: barber.name,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      status: 'Confirmado'
    };

    addAppointment(appointment);
    alert('¡Cita reservada exitosamente!');
    // Reset form
    setSelectedBarber('');
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
  };

  return (
    <div className="booking-container">
      <h2>Reservar Cita</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Selecciona un Barbero:</label>
          <select
            value={selectedBarber}
            onChange={(e) => setSelectedBarber(e.target.value)}
            required
          >
            <option value="">-- Seleccionar --</option>
            {barbers.map(barber => (
              <option key={barber.id} value={barber.id}>
                {barber.name} - {barber.specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Servicio:</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">-- Seleccionar --</option>
            {services.map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fecha:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
          >
            <option value="">-- Seleccionar --</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="booking-btn">Reservar Cita</button>
      </form>
    </div>
  );
};

export default Booking;