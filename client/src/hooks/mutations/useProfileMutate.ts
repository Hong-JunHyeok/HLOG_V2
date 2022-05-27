import { useMutation, useQueryClient } from 'react-query';

const useProfileMutate = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['my_info']);
    },
  });

  return mutate;
};

export default useProfileMutate;
