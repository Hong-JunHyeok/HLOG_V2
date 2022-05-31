import { useMutation } from 'react-query';
import customAxios from '@/utils/customAxios';

const useEditReply = (replyId: number) => {
  const editReply = (reply: string) => customAxios.patch(`/reply/${replyId}`, {
    commentContent: reply,
  });

  const { mutateAsync } = useMutation(editReply);

  return mutateAsync;
};

export default useEditReply;
