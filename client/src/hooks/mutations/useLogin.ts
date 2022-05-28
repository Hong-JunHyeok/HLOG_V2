import { useMutation, useQueryClient } from 'react-query';
import useLocalStorage from '@/utils/useLocalStorage';
import customAxios from '@/utils/customAxios';
import useAuth from '../useAuth';

interface LoginProps {
  email: string;
  password: string;
}

const useLogin = () => {
  const { loginDispatch } = useAuth();
  const queryClient = useQueryClient();
  const { setValue } = useLocalStorage('hlog_access_token', '');

  const login = (data: LoginProps) => customAxios.post('/auth/login', data);

  const { mutate } = useMutation(login, {
    onSuccess: (response) => {
      loginDispatch();
      setValue(response.data.payload.accessToken);
      queryClient.invalidateQueries(['my_info']);
    },
  });

  return mutate;
};

export default useLogin;
