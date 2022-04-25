import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css";

const markdownIt = new MarkdownIt({
	html: true,
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
