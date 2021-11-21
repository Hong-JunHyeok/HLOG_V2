import customAxios from "../utils/customAxios";

export const getPostsResponse = async () => {
  try {
    const response = await customAxios.get("/post/posts");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPostResponse = async (postId: number) => {
  try {
    const response = await customAxios.get(`/post/${postId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
