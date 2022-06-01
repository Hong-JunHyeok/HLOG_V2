import { useMutation } from 'react-query';
import customAxios from '@/utils/customAxios';

interface PayloadType {
  email: string;
  password: string;
  username: string;
}

const useJoin = () => {
  const join = (payload: PayloadType) => customAxios.post('/auth/join', payload);

  const { mutateAsync } = useMutation(join);

  return mutateAsync;
};

export default useJoin;
