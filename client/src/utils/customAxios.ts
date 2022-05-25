import axios, { AxiosRequestConfig } from 'axios';

const AxiosConfigure: AxiosRequestConfig = {
  baseURL: process.env.API_SERVER_URL,
  timeout: 1000,
  withCredentials: true
}

export default axios.create(AxiosConfigure);
