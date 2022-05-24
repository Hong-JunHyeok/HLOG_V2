import { useState } from "react";
import customAxios from "@/utils/customAxios"
import useLocalStorage from "@/utils/useLocalStorage";

const useAuth = () => {
  const [token, setToken, removeToken] = useLocalStorage('hlog_token', "");
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true: false);

  const login = async (email: string, password: string) => {
    const response = await customAxios.post('/auth/login', {
      email,
      password,
    });

    setToken(response.data.payload.accessToken);
    setIsLoggedIn(true);
  }

  const logout = () => {
    setIsLoggedIn(false);
    removeToken();
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
}

export default useAuth;
