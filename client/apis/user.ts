import customAxios from "../utils/customAxios";

export const getMyInfoRequest = async () => {
  try {
    const response = await customAxios.get(`/user/me`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const patchMyProfileRequest = async (
  userId: number,
  profileData: FormData
) => {
  try {
    const response = await customAxios.patch(
      `/user/profile/${userId}`,
      profileData
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
};
