import { useMutation, useQueryClient } from 'react-query';
import useLocalStorage from '@/hooks/useLocalStorage';
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

  const { mutateAsync } = useMutation(login, {
    onSuccess: (response) => {
      setValue(response.data.payload.accessToken);
      loginDispatch();
      queryClient.invalidateQueries(['my_info']);
    },
  });

  return mutateAsync;
};

export default useLogin;
