import customAxios from "../utils/customAxios";

export const getPostsResponse = async () => {
	try {
		const response = await customAxios.get("/post/posts/recent");
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const getPopularPostsRequest = async () => {
	try {
		const response = await customAxios.get("/post/posts/popular");
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const getPostRequest = async (postId: number) => {
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

export const deletePostRequest = async (postId: number) => {
	try {
		const response = await customAxios.delete(`/post/${postId}`);

		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const patchPostThumnail = async (
	postId: number,
	thumnailData: FormData,
) => {
	try {
		const response = await customAxios.patch(
			`/post/thumnail/${postId}`,
			thumnailData,
		);
		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const postLikeRequest = async (postId: number) => {
	try {
		const response = await customAxios.post(`/post/like/${postId}`);

		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const postUnlikeRequest = async (postId: number) => {
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

// *

export const commentLikeRequest = async (commentId: number) => {
	try {
		const response = await customAxios.post(`/comment/like/${commentId}`);

		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const commentUnlikeRequest = async (commentId: number) => {
	try {
		const response = await customAxios.delete(`/comment/unlike/${commentId}`);

		return response.data;
	} catch (error) {
		return error.response;
	}
};

export const getIsLikedCommentRequest = async (commentId: number) => {
	try {
		const response = await customAxios.get(`/comment/like/${commentId}`);

		return response.data;
	} catch (error) {
		return error.response;
	}
};
