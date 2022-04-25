require("dotenv").config();

module.exports = {
	images: {
		domains: ['localhost'],
	},
	experimental: {
		concurrentFeatures: true,
    runtime: 'nodejs',
  },
};
