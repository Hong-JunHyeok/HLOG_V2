import customAxios from "../utils/customAxios";

export const createCommentRequest = async (
	postId: number,
	commentContent: string,
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

export const getCommentsRequest = async (postId: number) => {
	try {
		const response = await customAxios.get(`/comment/${postId}`);
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const deleteCommentRequest = async (commentId: number) => {
	try {
		const response = await customAxios.delete(`/comment/${commentId}`);
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const editCommentRequest = async (
	commentId: number,
	commentContent: string,
) => {
	try {
		const response = await customAxios.patch(`/comment/${commentId}`, {
			commentContent,
		});
		return response.data;
	} catch (error) {
		return error.resposne;
	}
};
