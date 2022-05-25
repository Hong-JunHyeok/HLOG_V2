import customAxios from "@/utils/customAxios";
import useLocalStorage from "@/utils/useLocalStorage";

const useRefreshToken = () => {
  const [_, setHlogToken] = useLocalStorage('hlog_access_token', '');

  const refresh = async() => {
    const response = await customAxios.post('/auth/refresh');
    const { accessToken } = response.data.payload;
    setHlogToken(accessToken)

    return { accessToken };
  }

  return refresh;
}

export default useRefreshToken;
