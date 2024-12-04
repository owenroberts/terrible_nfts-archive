const moment = require("moment");

module.exports = function(eleventy) {

	eleventy.addWatchTarget("./src/sass/");

	eleventy.addPassthroughCopy("./src/css");
	eleventy.addPassthroughCopy("./src/favicon.ico");
	eleventy.addPassthroughCopy("./src/images/*.jpg");

	eleventy.addCollection('terrible_nfts', collection =>
		collection.getFilteredByGlob([
			'src/fposts/*.html'
		])
		.sort((a, b) => b.date - a.date)
	);

	eleventy.addFilter("toUTCString", (date) => {
		const utc = date.toUTCString();
		return moment.utc(utc).format("MMMM D, YYYY");
	});

	eleventy.setLiquidOptions({
		dynamicPartials: false,
	});

	return {
		// htmlTemplateEngine: "njk",
		dir: {
			input: "./src",
			output: "./docs"
		}
	}
};