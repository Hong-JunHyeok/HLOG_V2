import { useQuery } from 'react-query';
import customAxios from '@/utils/customAxios';

const useIsLike = (postId: number) => {
  const getLike = (id: number) => customAxios.get(`/post/like/${id}`);

  return useQuery(['post', postId], () => getLike(postId));
};

export default useIsLike;
