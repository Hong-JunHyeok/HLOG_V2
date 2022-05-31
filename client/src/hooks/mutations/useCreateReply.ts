import { useMutation, useQueryClient } from 'react-query';
import customAxios from '@/utils/customAxios';

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
      queryClient.invalidateQueries(['reply']);
    },
  });

  return mutateAsync;
};

export default useCreateReply;
