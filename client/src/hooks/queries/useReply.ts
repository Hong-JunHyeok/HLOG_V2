import { useQuery, UseQueryResult } from 'react-query';
import customAxios from '@/utils/customAxios';
import { ReplyType } from '@/@types/reply';

const useReply = (commentId: number, enabled = true): UseQueryResult<ReplyType[]> => {
  const getReply = () => customAxios.get(`/reply/${commentId}`);

  return useQuery(['reply', commentId], getReply, {
    enabled,
  });
};

export default useReply;
