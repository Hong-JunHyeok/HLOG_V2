import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { MY_INFO_QUERY_KEY } from '@/constants/queries';

const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  const deleteProfile = () => customAxios.delete('/user/profile');

  const { mutateAsync } = useMutation(deleteProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries([MY_INFO_QUERY_KEY]);
    },
  });

  return mutateAsync;
};

export default useDeleteProfile;
