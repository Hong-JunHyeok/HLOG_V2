const markdownCenterInserter = (
	textareaEl: HTMLTextAreaElement,
	decorator: string,
): string => {
	const startPosition = textareaEl.selectionStart;
	const endPosition = textareaEl.selectionEnd;
	// const draggedLength = endPosition - startPosition;

	const beforeText = textareaEl.value.substring(startPosition, 0); // 또는 ~.substring(0, startPostion), '안녕하세요. '
	const draggedText = textareaEl.value.substring(startPosition, endPosition); // '이지미'
	const afterText = textareaEl.value.substring(endPosition); // '입니다.'

	console.log(draggedText);

	const result = `${beforeText}${decorator}${draggedText}${decorator}${afterText}`;

	return result;
};

export default markdownCenterInserter;
