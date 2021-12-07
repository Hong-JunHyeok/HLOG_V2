const isDevMode = (): boolean => {
	return process.env.NODE_ENV === "development" ? true : false;
};

export default isDevMode;
