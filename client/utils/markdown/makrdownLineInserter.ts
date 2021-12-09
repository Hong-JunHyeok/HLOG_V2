const markdownLineInserter = (
	textareaEl: HTMLTextAreaElement,
	decorator: string,
): string => {
	const startPosition = textareaEl.selectionStart;

	const beforeText = textareaEl.value.slice(0, startPosition);
	const afterText = textareaEl.value.slice(startPosition);

	return beforeText + decorator + afterText;
};

export default markdownLineInserter;
