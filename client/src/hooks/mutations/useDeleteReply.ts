import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { REPLY_QUERY_KEY } from '@/constants/queries';

const useDeleteReply = (replyId: number) => {
  const queryClient = useQueryClient();
  const deleteReply = () => customAxios.delete(`/reply/${replyId}`);

  const { mutateAsync } = useMutation(deleteReply, {
    onSuccess: () => {
      queryClient.invalidateQueries([REPLY_QUERY_KEY, replyId]);
    },
  });

  return mutateAsync;
};

export default useDeleteReply;
