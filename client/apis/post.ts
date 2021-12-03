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

export const createPostRequest = async (postData: {
  title: string;
  code: string;
}) => {
  try {
    const response = await customAxios.post(`/post`, {
      postTitle: postData.title,
      postContent: postData.code,
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const patchPostThumnail = async (
  postId: number,
  thumnailData: FormData
) => {
  try {
    const response = await customAxios.patch(
      `/post/thumnail/${postId}`,
      thumnailData
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const likeRequest = async (postId: number) => {
  try {
    const response = await customAxios.post(`/post/like/${postId}`);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const unlikeRequest = async (postId: number) => {
  try {
    const response = await customAxios.delete(`/post/unlike/${postId}`);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const getIsLikedPostRequest = async (postId: number) => {
  try {
    const response = await customAxios.get(`/post/like/${postId}`);

    return response.data;
  } catch (error) {
    return error.response;
  }
};
