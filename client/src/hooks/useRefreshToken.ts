import customAxios from '@/utils/customAxios';
import useLocalStorage from '@/hooks/useLocalStorage';
import { HLOG_ACCESS_TOKEN_KEY } from '@/constants/storages';

const useRefreshToken = () => {
  const {
    setValue: setHlogToken,
  } = useLocalStorage(HLOG_ACCESS_TOKEN_KEY, '');

  const refresh = async () => {
    const response = await customAxios.post('/auth/refresh');
    const { accessToken } = response.data.payload;
    setHlogToken(accessToken);

    return { accessToken };
  };

  return refresh;
};

export default useRefreshToken;
