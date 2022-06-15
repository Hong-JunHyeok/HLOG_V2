import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';
import { REPLY_QUERY_KEY } from '@/constants/queries';

interface CreateReplyProps {
  commentId: number;
  reply: string;
}

const useCreateReply = () => {
  const queryClient = useQueryClient();
  const createReply = (payload: CreateReplyProps) => customAxios.post(`/reply/${payload.commentId}`, {
    commentContent: payload.reply,
  });

  const { mutateAsync } = useMutation(createReply, {
    onSuccess: () => {
      queryClient.invalidateQueries([REPLY_QUERY_KEY]);
    },
  });

  return mutateAsync;
};

export default useCreateReply;
