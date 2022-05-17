import hljs from "highlight.js";
import MarkdownIt from "markdown-it";

const markdownIt = new MarkdownIt({
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value;
			} catch (error) {
				console.error(error);
			}
		}

		return;
	},
});

export default markdownIt;
