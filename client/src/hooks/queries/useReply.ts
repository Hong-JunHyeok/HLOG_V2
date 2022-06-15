import { useQuery, UseQueryResult } from 'react-query';
import customAxios from '@/utils/customAxios';
import { ReplyType } from '@/@types/reply';
import { REPLY_QUERY_KEY } from '@/constants/queries';

const useReply = (commentId: number, enabled = true): UseQueryResult<ReplyType[]> => {
  const getReply = () => customAxios.get(`/reply/${commentId}`);

  return useQuery([REPLY_QUERY_KEY, commentId], getReply, {
    enabled,
  });
};

export default useReply;
