import { useMutation } from 'react-query';
import customAxios from '@/utils/customAxios';

interface CreateReplyProps {
  commentId: number;
  reply: string;
}

const useCreateReply = () => {
  const createReply = (payload: CreateReplyProps) => customAxios.post(`/reply/${payload.commentId}`, payload);

  const { mutateAsync } = useMutation(createReply);

  return mutateAsync;
};

export default useCreateReply;
