import customAxios from "@/utils/customAxios";
import useLocalStorage from "@/utils/useLocalStorage";
import useUser from "@/hooks/useUser";

const useRefreshToken = () => {
  const [_, setHlogToken] = useLocalStorage('hlog_access_token', '');

  const refresh = async() => {
    const response = await customAxios.post('/auth/refresh');
    const { user, accessToken } = response.data.payload;
    setHlogToken(accessToken)

    return { user, accessToken };
  }

  return refresh;
}

export default useRefreshToken;
