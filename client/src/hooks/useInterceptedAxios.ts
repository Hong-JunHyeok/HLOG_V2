import customAxios from '@/utils/customAxios';
// import useLocalStorage from '@/utils/useLocalStorage';
// import useRefreshToken from './useRefreshToken';

const useInterceptedAxios = () => customAxios;
// const { storedValue: hlogToken } = useLocalStorage('hlog_access_token', '');
// const refreshToken = useRefreshToken();

// customAxios.interceptors.request.use((config) => {
//   // 모든 Request Header에 Access토큰을 넣어주는 역할
//   if (!config.headers.authorization) {
//     config.headers.authorization = hlogToken;
//   }
//   return config;
// }, (error) => error);

// customAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // 토큰이 만료되었을 때 새로운 토큰을 발급하는 역할
//     const prevRequest = error?.config;
//     if (error?.response?.status === 403 && !prevRequest?.sent) {
//       prevRequest.sent = true;
//       const data = await refreshToken();
//       prevRequest.headers.authorization = data.accessToken;
//       return customAxios(prevRequest);
//     }
//     return customAxios;
//   },
// );

export default useInterceptedAxios;
