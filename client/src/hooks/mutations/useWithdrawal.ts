import { useMutation } from 'react-query';
import useInterceptedAxios from '../useInterceptedAxios';
import useLogout from '../useLogout';

const useWithdrawal = () => {
  const customAxios = useInterceptedAxios();
  const logout = useLogout();

  const withDrawalUser = (userId: string) => customAxios.delete(`/auth/${userId}`);

  const { mutate } = useMutation(withDrawalUser, {
    onSuccess: () => {
      logout();
    },
    onError: () => {},
  });

  return mutate;
};

export default useWithdrawal;
