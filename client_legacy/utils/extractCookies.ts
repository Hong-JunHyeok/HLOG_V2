const extractCookies = (cookieString: string) => {
	return cookieString
		.match(/(^|(?<=, ))[^=;,]+=[^;]+/g)
		.map((cookie) => cookie.split("=").map((v) => v.trim()))
		.filter((v) => v[0].length && v[1].length)
		.reduce((builder, cur) => {
			builder[cur[0]] = cur[1];
			return builder;
		}, {});
};

export default extractCookies;
