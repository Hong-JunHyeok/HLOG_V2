require("dotenv").config();

module.exports = {
	images: {
		domains: [process.env.NEXT_PUBLIC_API_DOMAIN],
	},
	swcMinify: true,
};
