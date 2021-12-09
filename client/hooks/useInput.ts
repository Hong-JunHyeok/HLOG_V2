import {
	useState,
	useCallback,
	ChangeEventHandler,
	Dispatch,
	SetStateAction,
} from "react";

const useInput = (
	initialValue: string = "",
	options?: {
		logging?: boolean;
		onlyEng?: boolean;
	},
): [
	string,
	ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
	Dispatch<SetStateAction<string>>,
] => {
	const [value, setValue] = useState(initialValue);

	const onChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			let { value } = event.target;

			if (options) {
				if (options.logging) {
					console.dir(value);
				}
				if (options.onlyEng) {
					value = value.replace(/[^a-zA-Z]/gi, "");
				}
			}

			setValue(value);
		},
		[],
	);

	return [value, onChange, setValue];
};

export default useInput;
