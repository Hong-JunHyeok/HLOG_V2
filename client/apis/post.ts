import axios from "axios";

export const getPostsResponse = async () => {
  const response = await axios.get("/post/posts");
  return response.data;
};
