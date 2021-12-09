import customAxios from "../utils/customAxios";

export const getMyInfoRequest = async () => {
	try {
		const response = await customAxios.get(`/user/me`);
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const getUserInfoRequest = async (userId: number) => {
	try {
		const response = await customAxios.get(`/user/${userId}`);
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const patchMyIntroRequest = async (
	userId: number,
	selfIntroduction: string,
) => {
	try {
		const response = await customAxios.patch(`/user/intro/${userId}`, {
			selfIntroduction,
		});

		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const patchMyProfileRequest = async (
	userId: number,
	profileData: FormData,
) => {
	try {
		const response = await customAxios.patch(
			`/user/profile/${userId}`,
			profileData,
		);

		return response.data;
	} catch (error) {
		return error.response;
	}
};
