const markdownLineInserter = (
	textareaEl: HTMLTextAreaElement,
	decorator: string,
): string => {
	const startPosition = textareaEl.selectionStart;
	const endPosition = textareaEl.selectionEnd;

	const beforeText = textareaEl.value.slice(0, startPosition);
	const afterText = textareaEl.value.substring(endPosition);

	return `${beforeText}${decorator} ${afterText.trimEnd()}`;
};

export default markdownLineInserter;
