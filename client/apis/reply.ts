import customAxios from "../utils/customAxios";

export const createReplyRequest = async (
	commentId: number,
	commentContent: string,
) => {
	try {
		const response = await customAxios.post(`/reply/${commentId}`, {
			commentContent,
		});

		return response.data;
	} catch (error) {
		return error.response;
	}
};
