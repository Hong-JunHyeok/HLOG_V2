import { useEffect } from 'react';
import customAxios from "@/utils/customAxios";
import useRefreshToken from "./useRefreshToken";
import useLocalStorage from "@/utils/useLocalStorage";

const useInterceptedAxios = () => {
  const refreshToken = useRefreshToken()
  const [ hlogToken ] = useLocalStorage('hlog_access_token', '');

  useEffect(() => {
    const requestIntercept = customAxios.interceptors.request.use(
      (config) => {
        // 모든 Request Header에 Access토큰을 넣어주는 역할
        if(!config.headers['authorization']) {
          config.headers['authorization'] = hlogToken;
        }
        return config;
      }, (error) => error
    );
    const responseIntercept = customAxios.interceptors.response.use(
      response => response, 
      async (error) => {
        // 토큰이 만료되었을 때 새로운 토큰을 발급하는 역할
        const prevRequest = error?.config;
        if(error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const data = await refreshToken();
          prevRequest.headers['authorization'] = data.accessToken;
          return customAxios(prevRequest)
        } else {
          return customAxios;
        }
      }
    );

    return () => {
      customAxios.interceptors.request.eject(requestIntercept);
      customAxios.interceptors.response.eject(responseIntercept);
    }
  }, [hlogToken]);
  
  return customAxios;
}

export default useInterceptedAxios;
