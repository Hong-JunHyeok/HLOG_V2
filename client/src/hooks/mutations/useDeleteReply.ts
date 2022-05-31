import { useMutation } from 'react-query';
import customAxios from '@/utils/customAxios';

const useDeleteReply = (replyId: number) => {
  const deleteReply = () => customAxios.delete(`/reply/${replyId}`);

  const { mutateAsync } = useMutation(deleteReply);

  return mutateAsync;
};

export default useDeleteReply;
