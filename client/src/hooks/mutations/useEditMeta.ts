import { useMutation, useQueryClient } from 'react-query';
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
      queryClient.invalidateQueries(['my_info']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutate;
};

export default useEditMeta;
