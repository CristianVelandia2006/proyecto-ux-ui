import React, { useState, useEffect } from 'react';
import { useAppointments } from '../AppointmentContext';
import './Booking.css';

export const servicePrices = {
  'Corte Clásico': 20000,
  'Corte Moderno': 25000,
  'Afeitado Navaja': 15000,
  'Barba': 10000,
  'Corte + Barba': 30000,
  'Tratamiento Facial': 35000
};

const Booking = () => {
  const { addAppointment } = useAppointments();
  
  // Estado para los barberos obtenidos desde el registro
  const [barbers, setBarbers] = useState([]);
  
  // Estado para las horas (base)
  const [baseTimeSlots, setBaseTimeSlots] = useState(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30']);
  
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Estado para las citas existentes y filtrar horas ocupadas
  const [appointments, setAppointments] = useState([]);

  // 1. Efecto para cargar barberos, horario y citas previas
  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const registeredBarbers = allUsers.filter(user => user.role === 'barber');
    setBarbers(registeredBarbers);

    const savedSchedule = localStorage.getItem('barberSchedule');
    if (savedSchedule) {
      setBaseTimeSlots(JSON.parse(savedSchedule));
    }

    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  }, []);

  // Filtrar horas ocupadas para la fecha seleccionada
  const availableTimeSlots = baseTimeSlots.filter(time => {
    const isBooked = appointments.some(
      apt => apt.date === selectedDate && apt.time === time && apt.barber === (barbers.find(b => b.email === selectedBarber)?.username || '')
    );
    return !isBooked;
  });

  const services = Object.keys(servicePrices);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBarber || !selectedService || !selectedDate || !selectedTime) {
      alert('Por favor completa todos los campos');
      return;
    }

    const barber = barbers.find(b => b.email === selectedBarber);
    
    const appointment = {
      id: Date.now(),
      barber: barber.username,
      clientName: "Cliente",
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      status: 'Confirmado'
    };

    addAppointment(appointment);

    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const updatedAppointments = [...existingAppointments, appointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Actualizar estado local
    setAppointments(updatedAppointments);

    alert(`¡Cita reservada con ${barber.username} exitosamente!`);
    
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
            <option value="">-- Seleccionar Barbero --</option>
            {barbers.length > 0 ? (
              barbers.map((barber) => (
                <option key={barber.email} value={barber.email}>
                  {/* RF-11: Visualización de información básica antes de reservar */}
                  {barber.username} — {barber.experience || '0'} años exp. | Especialidad: {barber.specialty || 'General'}
                </option>
              ))
            ) : (
              <option disabled>No hay barberos registrados</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Servicio:</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">-- Seleccionar Servicio --</option>
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
            disabled={!selectedDate}
          >
            <option value="">
              {selectedDate ? '-- Seleccionar Hora --' : '-- Primero selecciona fecha --'}
            </option>
            {availableTimeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
            {selectedDate && availableTimeSlots.length === 0 && (
              <option disabled>No hay horas disponibles este día</option>
            )}
          </select>
        </div>

        <button type="submit" className="booking-btn">Confirmar Reserva</button>
      </form>
    </div>
  );
};

export default Booking;