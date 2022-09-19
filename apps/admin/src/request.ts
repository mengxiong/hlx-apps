import axios from 'axios';

export const request = axios.create({
  timeout: 15000,
  baseURL: '/api',
});
