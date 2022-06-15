import { useMutation, useQueryClient } from 'react-query';
import { MY_INFO_QUERY_KEY } from '@/constants/queries';
import useInterceptedAxios from '../useInterceptedAxios';

const useEditMeta = () => {
  const queryClient = useQueryClient();
  const customAxios = useInterceptedAxios();

  type PayloadType = {
    username: string;
    selfIntroduction: string;
  };

  const updateMeta = (payload: PayloadType) => customAxios.patch('/user/meta', payload);

  const { mutate } = useMutation(updateMeta, {
    onSuccess: () => {
      queryClient.invalidateQueries([MY_INFO_QUERY_KEY]);
    },
  });

  return mutate;
};

export default useEditMeta;
