const markdownCenterInserter = (
	textareaEl: HTMLTextAreaElement,
	decorator: string,
	options?: {
		enter?: boolean;
		lang?: string;
	},
): string => {
	const startPosition = textareaEl.selectionStart;
	const endPosition = textareaEl.selectionEnd;

	const beforeText = textareaEl.value.substring(startPosition, 0); // 또는 ~.substring(0, startPostion), '안녕하세요. '
	const draggedText = textareaEl.value.substring(startPosition, endPosition); // '이지미'
	const afterText = textareaEl.value.substring(endPosition); // '입니다.'

	let result = `${beforeText}${decorator}${draggedText}${decorator}${afterText}`;

	if (options) {
		if (options.enter) {
			result = `${beforeText}${decorator}\n${draggedText}\n${decorator}${afterText}`;
		}
		if (options.lang) {
			result = `${beforeText}${decorator}${options.lang}\n${draggedText}\n${decorator}${afterText}`;
		}
	}

	return result;
};

export default markdownCenterInserter;
