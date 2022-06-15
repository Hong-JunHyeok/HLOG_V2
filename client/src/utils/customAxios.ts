import axios, { AxiosRequestConfig, HeadersDefaults } from 'axios';
import { HLOG_ACCESS_TOKEN_KEY } from '@/constants/storages';

const AxiosConfigure: AxiosRequestConfig = {
  baseURL: process.env.API_SERVER_URL,
  timeout: 1000,
  withCredentials: true,
};

const customAxios = axios.create(AxiosConfigure);

interface CommonHeaderProperties extends HeadersDefaults {
  authorization: string;
}

customAxios.interceptors.request.use((config) => {
  // 모든 Request Header에 Access토큰을 넣어주는 역할
  const hlogToken = localStorage.getItem(HLOG_ACCESS_TOKEN_KEY);

  if (!config.headers.authorization && hlogToken) {
    config.headers.authorization = JSON.parse(hlogToken);
  }

  return config;
}, (error) => error);

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 토큰이 만료되었을 때 새로운 토큰을 발급하는 역할
    const prevRequest = error?.config;
    const errorMessage = error.response.data?.message;
    if (error?.response?.status === 403 && !prevRequest?.sent && errorMessage === 'jwt expired') {
      prevRequest.sent = true;
      const refreshToken = async () => {
        const response = await customAxios.post('/auth/refresh');
        const { accessToken } = response.data.payload;

        return accessToken;
      };
      const accessToken = await refreshToken();
      prevRequest.headers.authorization = accessToken;
      (customAxios.defaults.headers as CommonHeaderProperties).authorization = accessToken;
      return customAxios(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default customAxios;
