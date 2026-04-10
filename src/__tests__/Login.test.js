import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login/Login';
import { AppointmentProvider } from '../AppointmentContext';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders login form', () => {
    render(
      <MemoryRouter>
        <AppointmentProvider>
          <Login />
        </AppointmentProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('BARBERÍA')).toBeInTheDocument();
    expect(screen.getByText('INICIAR SESIÓN')).toBeInTheDocument();
    expect(screen.getByLabelText('CORREO')).toBeInTheDocument();
    expect(screen.getByLabelText('CONTRASEÑA')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ENTRAR' })).toBeInTheDocument();
  });

  test('successful login navigates to dashboard', async () => {
    render(
      <MemoryRouter>
        <AppointmentProvider>
          <Login />
        </AppointmentProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('CORREO');
    const passwordInput = screen.getByLabelText('CONTRASEÑA');
    const submitButton = screen.getByRole('button', { name: 'ENTRAR' });

    fireEvent.change(emailInput, { target: { value: 'admin@barberia.com' } });
    fireEvent.change(passwordInput, { target: { value: 'barber123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('failed login shows error message', () => {
    render(
      <MemoryRouter>
        <AppointmentProvider>
          <Login />
        </AppointmentProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText('CORREO');
    const passwordInput = screen.getByLabelText('CONTRASEÑA');
    const submitButton = screen.getByRole('button', { name: 'ENTRAR' });

    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Correo o contraseña incorrectos.')).toBeInTheDocument();
  });
});