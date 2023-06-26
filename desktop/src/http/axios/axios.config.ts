import axios from "axios";
export const URL = 'http://localhost:4444/api';

export const $api = axios.create({
  baseURL: URL,
  withCredentials: true
});

$api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})
