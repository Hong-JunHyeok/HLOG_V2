import { AxiosResponse } from 'axios';
import useInterceptedAxios from './useInterceptedAxios';

interface JoinProps {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error) => void;
}

interface PayloadType {
  email: string;
  password: string;
  username: string;
}

const useJoin = ({
  onSuccess,
  onError,
}: JoinProps) => {
  const customAxios = useInterceptedAxios();

  const join = (payload: PayloadType) => customAxios.post('/auth/join', payload).then(onSuccess).catch(onError);

  return join;
};

export default useJoin;
