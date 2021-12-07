import customAxios from "../customAxios";

const cookieSetter = (req): void => {
	const cookie = req ? req.headers.cookie : "";
	customAxios.defaults.headers["Authrization"] = "";

	if (cookie && req) {
		customAxios.defaults.headers["Authrization"] = cookie;
	}
};
