import customAxios from "../customAxios";

const cookieSetter = (token: string): void => {
	if (token) {
		customAxios.defaults.headers["Authorization"] = token;
	}
};

export default cookieSetter;
