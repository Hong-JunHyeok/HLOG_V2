import useLocalStorage from "@/utils/useLocalStorage";
import useInterceptedAxios from "./useInterceptedAxios";
import useUser from "./useUser";

const useLogout = () => {
  const [ hlogToken, setHlogToken, removeToken] = useLocalStorage('hlog_access_token','');
  const { setUser } = useUser();
  const customAxios = useInterceptedAxios();

  const logout = async () => {
    await customAxios.post('/auth/logout');
    removeToken();
    setUser(null);
  };

  return logout;
}

export default useLogout;
