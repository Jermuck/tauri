import axios, { AxiosError } from "axios";
import { IAuthorizationResponse } from "../../../types/index.types";

export const URL = 'http://localhost:4444/api';

export const $api = axios.create({
  baseURL: URL,
  withCredentials: true
});

$api.interceptors.response.use(config => config, async (err:AxiosError) => {
  const requestConfig = err.config;
  if(!requestConfig) return;
  if(err.response?.status === 401){
    const {data} = await axios.get<IAuthorizationResponse>(`${URL}/auth/refresh`);
    localStorage.setItem('access', data.data.access);
    return $api.request(requestConfig);
  };
})

$api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})
