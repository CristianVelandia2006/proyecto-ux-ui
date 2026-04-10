import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever appointments change
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointment) => {
    setAppointments(prev => [...prev, { ...appointment, id: Date.now() }]);
  };

  const cancelAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const updateAppointment = (id, updates) => {
    setAppointments(prev => prev.map(apt =>
      apt.id === id ? { ...apt, ...updates } : apt
    ));
  };

  return (
    <AppointmentContext.Provider value={{
      appointments,
      addAppointment,
      cancelAppointment,
      updateAppointment
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};