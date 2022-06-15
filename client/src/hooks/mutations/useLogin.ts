import { useMutation, useQueryClient } from 'react-query';
import useLocalStorage from '@/hooks/useLocalStorage';
import customAxios from '@/utils/customAxios';
import useAuth from '../useAuth';
import { MY_INFO_QUERY_KEY } from '@/constants/queries';

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
      queryClient.invalidateQueries([MY_INFO_QUERY_KEY]);
    },
  });

  return mutateAsync;
};

export default useLogin;
