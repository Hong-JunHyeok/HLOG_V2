import { useMutation, useQueryClient } from 'react-query';
import useLocalStorage from '@/utils/useLocalStorage';
import customAxios from '@/utils/customAxios';

interface LoginProps {
  email: string;
  password: string;
}
const useLogin = () => {
  const { invalidateQueries } = useQueryClient();
  const { setValue } = useLocalStorage('hlog_access_token', '');

  const login = (data: LoginProps) => customAxios.post('/auth/login', data);

  const { mutate } = useMutation(login, {
    onSuccess: (response: any) => {
      setValue(response.data.payload.accessToken);

      invalidateQueries(['my_info']);
    },
  });

  return mutate;
};

export default useLogin;
