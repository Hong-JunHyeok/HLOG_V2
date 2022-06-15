import { useMutation, useQueryClient } from 'react-query';
import { MY_INFO_QUERY_KEY } from '@/constants/queries';
import useUpload from '../useUpload';

const useEditProfile = () => {
  const queryClient = useQueryClient();
  const uploader = useUpload('/user/profile');

  const { mutate } = useMutation((formData: FormData) => uploader.upload(formData), {
    onSuccess: () => {
      queryClient.invalidateQueries([MY_INFO_QUERY_KEY]);
    },
    onError: () => {
      throw new Error('프로필을 업데이트하면서 오류가 발생했습니다.');
    },
  });

  return mutate;
};

export default useEditProfile;
