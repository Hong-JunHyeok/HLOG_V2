import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';

const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  const deleteProfile = () => customAxios.delete('/user/profile');

  const { mutateAsync } = useMutation(deleteProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['my_info']);
    },
  });

  return mutateAsync;
};

export default useDeleteProfile;
