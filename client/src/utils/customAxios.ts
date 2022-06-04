import axios, { AxiosRequestConfig } from 'axios';

const AxiosConfigure: AxiosRequestConfig = {
  baseURL: process.env.API_SERVER_URL,
  timeout: 1000,
  withCredentials: true,
};

const customAxios = axios.create(AxiosConfigure);

customAxios.interceptors.request.use((config) => {
  // 모든 Request Header에 Access토큰을 넣어주는 역할
  const hlogToken = localStorage.getItem('hlog_access_token');
  // TODO: cookie에 refresh토큰이 있다면 accessToken 재발급

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
      return customAxios(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default customAxios;
