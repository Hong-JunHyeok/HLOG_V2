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
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      console.log('토큰 만료');
      const refreshToken = async () => {
        const response = await customAxios.post('/auth/refresh');
        const { accessToken } = response.data.payload;

        return accessToken;
      };
      const accessToken = await refreshToken();
      prevRequest.headers.authorization = accessToken;
      console.log('토큰 리프레쉬 완료');
      return customAxios(prevRequest);
    }
  },
);

export default customAxios;
