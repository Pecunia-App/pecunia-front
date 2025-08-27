import { Credentials } from '../../models/forms.model';

export const MOCK_USER_VALID: Credentials = {
  email: 'user@pecunia.fr',
  password: 'Password123!',
};

export const MOCK_USER_INVALID: Credentials = {
  email: 'testpecunia.fr',
  password: 'password',
};

//date expiration 20/09/2120
export const MOCK_JWT_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHBlY3VuaWEuZnIiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE3NTYzMDAwMDAsImV4cCI6NDc1NjMwMDAwMH0.AD-q0bWtfK1uilT7lWRI59KdfVxBI59f3ND0iPhv_lA';

export const MOCK_JWT_TOKEN_EXPIRED =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHBlY3VuaWEuZnIiLCJyb2xlcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTYwMDAwMDAwMH0.7k3M0zXSt-UYYj0wLbMXUvYuEtQmdX3EIT0JLMugBAY';

export const MOCK_AUTH_ERROR_401 = {
  status: 401,
  statusText: 'Unauthorized',
  error: { message: 'Email ou mot de passe incorrect' },
};

export const MOCK_AUTH_ERROR_500 = {
  status: 500,
  statusText: 'Internal Server Error',
  error: { message: 'Erreur inconnue' },
};
