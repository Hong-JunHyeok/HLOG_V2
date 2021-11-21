import customAxios from "../utils/customAxios";

export const createCommentRequest = async (
  postId: number,
  commentContent: string
) => {
  try {
    const response = await customAxios.post(`/comment/${postId}`, {
      commentContent,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
