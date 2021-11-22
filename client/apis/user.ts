import customAxios from "../utils/customAxios";

export const getMyInfoRequest = async (accessToken: string) => {
  try {
    const response = await customAxios.get(`/user/me`, {
      headers: { authorization: accessToken },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
