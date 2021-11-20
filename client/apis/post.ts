import axios from "axios";

export const getPostsResponse = async () => {
  try {
    const response = await axios.get("/post/posts");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getPostResponse = async (postId: number) => {
  try {
    const response = await axios.get(`/post/${postId}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
