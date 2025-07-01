import { getTokenFromLocalStorage } from '@expressControllers/auth/auth.controller';
import { UserLoginPayload, UserPayload } from '@app/api/models/users/users.types';

export const getAuthHeaders = (): HeadersInit => {
  const token = getTokenFromLocalStorage();
  return token
    ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
};

export const login = async (userLoginPayload: UserLoginPayload): Promise<any | Error> => {
  const headers = getAuthHeaders();
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(userLoginPayload),
  };

  try {
    const response = await fetch('/api/users/auth', requestOptions);

    if (response.status === 400) {
      const errorMessage = await response.json();
      return new Error(errorMessage.error || 'Solicitud incorrecta');
    }
    if (response.status === 401) {
      return new Error('No autorizado');
    }
    if (response.status === 500) {
      return new Error('Error interno del servidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userPayload: UserPayload): Promise<any | Error> => {
  const headers = getAuthHeaders();
  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(userPayload),
  };

  try {
    const response = await fetch('/api/users', requestOptions);

    if (response.status === 400) {
      const errorMessage = await response.json();
      return new Error(errorMessage.error || 'Solicitud incorrecta');
    }
    if (response.status === 500) {
      return new Error('Error interno del servidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};