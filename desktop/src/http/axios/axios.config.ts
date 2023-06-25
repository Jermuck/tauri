import axios from "axios";
export const URL = 'http://localhost:4444/api';

export const $api = axios.create({
  baseURL: URL,
  withCredentials: true
})
