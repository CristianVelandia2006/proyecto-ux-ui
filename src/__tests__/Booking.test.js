import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Booking from '../components/Booking';
import { AppointmentProvider } from '../AppointmentContext';

// Mock the context
const mockAddAppointment = jest.fn();
jest.mock('../AppointmentContext', () => ({
  useAppointments: () => ({
    addAppointment: mockAddAppointment,
  }),
  AppointmentProvider: ({ children }) => <div>{children}</div>,
}));

describe('Booking Component', () => {
  beforeEach(() => {
    mockAddAppointment.mockClear();
  });

  test('renders booking form', () => {
    render(
      <AppointmentProvider>
        <Booking />
      </AppointmentProvider>
    );

    expect(screen.getByText('Reservar Cita')).toBeInTheDocument();
    expect(screen.getByLabelText('Selecciona un Barbero:')).toBeInTheDocument();
    expect(screen.getByLabelText('Servicio:')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha:')).toBeInTheDocument();
    expect(screen.getByLabelText('Hora:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reservar Cita' })).toBeInTheDocument();
  });

  test('submits booking successfully', () => {
    // Mock alert
    global.alert = jest.fn();

    render(
      <AppointmentProvider>
        <Booking />
      </AppointmentProvider>
    );

    const barberSelect = screen.getByLabelText('Selecciona un Barbero:');
    const serviceSelect = screen.getByLabelText('Servicio:');
    const dateInput = screen.getByLabelText('Fecha:');
    const timeSelect = screen.getByLabelText('Hora:');
    const submitButton = screen.getByRole('button', { name: 'Reservar Cita' });

    fireEvent.change(barberSelect, { target: { value: '1' } });
    fireEvent.change(serviceSelect, { target: { value: 'Corte Clásico' } });
    fireEvent.change(dateInput, { target: { value: '2026-04-15' } });
    fireEvent.change(timeSelect, { target: { value: '10:00' } });
    fireEvent.click(submitButton);

    expect(mockAddAppointment).toHaveBeenCalledWith({
      barber: 'Carlos Mendoza',
      service: 'Corte Clásico',
      date: '2026-04-15',
      time: '10:00',
      status: 'Confirmado'
    });
    expect(global.alert).toHaveBeenCalledWith('¡Cita reservada exitosamente!');
  });

  test('shows error when form is incomplete', () => {
    global.alert = jest.fn();

    render(
      <AppointmentProvider>
        <Booking />
      </AppointmentProvider>
    );

    const submitButton = screen.getByRole('button', { name: 'Reservar Cita' });
    fireEvent.click(submitButton);

    expect(global.alert).toHaveBeenCalledWith('Por favor completa todos los campos');
    expect(mockAddAppointment).not.toHaveBeenCalled();
  });
});