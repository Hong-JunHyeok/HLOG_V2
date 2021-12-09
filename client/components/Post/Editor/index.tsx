import React, {
	KeyboardEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import styles from "./editor.module.scss";
import { BiBold, BiItalic } from "react-icons/bi";
import { MdOutlineFormatStrikethrough } from "react-icons/md";
import { Else, If, Then } from "react-if";
import useInput from "../../../hooks/useInput";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import { createPostRequest, patchPostThumnail } from "../../../apis/post";
import { useRouter } from "next/router";
import imageFormat from "../../../utils/formatter/image-format";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ChangeEvent } from "react";
import PostItem from "../PostItem";
import { useTypedSelector } from "../../../utils/useTypedSelector";
import markdownCenterInserter from "../../../utils/markdown/markdownCenterInserter";
import markdownLineInserter from "../../../utils/markdown/makrdownLineInserter";

const Editor = () => {
	const router = useRouter();

	const markdownIt = new MarkdownIt({
		highlight: (str, lang) => {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(str, { language: lang }).value;
				} catch (error) {
					console.error(error);
				}
			}

			return "";
		},
	});

	const codeEditorRef = useRef<null | HTMLTextAreaElement>(null);
	const thumnailInputRef = useRef<HTMLInputElement | null>(null);

	const [isEmptyContent, setIsEmptyContent] = useState<boolean>(true);
	const [title, onChangeTitle, setTitle] = useInput("");
	const [code, onChangeCode, setCode] = useInput("");
	const [createPostSuccess, setCreatePostSuccess] = useState(false);
	const [thumnail, setThumnail] = useState<File>();

	const authState = useTypedSelector((state) => state.auth);

	const todayDateFormatter = useMemo(() => {
		return `${new Date().getFullYear()}-${
			new Date().getMonth() + 1
		}-${new Date().getDate()}`;
	}, []);

	const handleSubmit = useCallback(async () => {
		const postData = {
			title,
			code,
		};

		try {
			const response = await createPostRequest(postData);
			const postId = response.payload.postId;

			const formData = new FormData();

			console.log(thumnail);
			formData.append("thumnail", thumnail);

			await patchPostThumnail(postId, formData);

			setCreatePostSuccess(true);
			setTitle("");
			setCode("");

			localStorage.removeItem("editorContent");

			router.push("/");
		} catch (error) {
			console.error(error);
		}
	}, [title, code, thumnail, router]);

	const handleOpenThumnailInput = useCallback(() => {
		thumnailInputRef.current.click();
	}, [thumnailInputRef]);

	const onChangeThumnail = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setThumnail(event.target.files[0]);
		},
		[setThumnail],
	);

	const handleKeySave = useCallback(
		(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
			console.log(event.key);
		},
		[codeEditorRef],
	);

	const handleChangeHeading = useCallback(
		(heading: "#" | "##" | "###" | "####") => {
			setCode(markdownLineInserter(codeEditorRef.current, heading));
			codeEditorRef.current.focus();
		},
		[codeEditorRef, setCode],
	);

	const handleChangeFont = useCallback(
		(decorator: "**" | "*" | "~~") => {
			setCode(markdownCenterInserter(codeEditorRef.current, decorator));
			codeEditorRef.current.focus();
		},
		[codeEditorRef, setCode],
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if ((title || code) && !createPostSuccess) {
				const editorData = JSON.stringify({
					title,
					code,
				});

				localStorage.setItem("editorContent", editorData);
			}
		}, 10000);

		return () => clearInterval(interval);
	}, [title, code, createPostSuccess]);

	useEffect(() => {
		const savedCode: {
			title: string;
			code: string;
		} = JSON.parse(localStorage.getItem("editorContent"));

		if (!savedCode) {
			return;
		}

		if (savedCode.title) {
			setTitle(savedCode.title);
		}
		if (savedCode.code) {
			setCode(savedCode.code);
		}
	}, []);

	useEffect(() => {
		if (title && code) {
			setIsEmptyContent(false);
		} else {
			setIsEmptyContent(true);
		}
	}, [title, code]);

	return (
		<React.Fragment>
			<div className={styles.container}>
				<header className={styles.tools}>
					<ul className={styles.headings}>
						<li>
							<button onClick={() => handleChangeHeading("#")}>
								H<span>1</span>
							</button>
						</li>
						<li>
							<button onClick={() => handleChangeHeading("##")}>
								H<span>2</span>
							</button>
						</li>
						<li>
							<button onClick={() => handleChangeHeading("###")}>
								H<span>3</span>
							</button>
						</li>
						<li>
							<button onClick={() => handleChangeHeading("####")}>
								H<span>4</span>
							</button>
						</li>
					</ul>

					<ul className={styles.fonts}>
						<li>
							<button onClick={() => handleChangeFont("**")}>
								<BiBold />
							</button>
						</li>
						<li>
							<button onClick={() => handleChangeFont("*")}>
								<BiItalic />
							</button>
						</li>
						<li>
							<button onClick={() => handleChangeFont("~~")}>
								<MdOutlineFormatStrikethrough />
							</button>
						</li>
					</ul>
				</header>
				<div className={styles.editor}>
					<textarea
						className={styles.codeMirror}
						value={code}
						onChange={onChangeCode}
						onKeyPress={handleKeySave}
						ref={codeEditorRef}
					/>
					<div
						className={styles.preview}
						dangerouslySetInnerHTML={{ __html: markdownIt.render(code) }}
					/>
				</div>

				<div className={styles.metaContainer}>
					<img
						src={
							authState.myInfo.profileUrl
								? imageFormat(authState.myInfo.profileUrl)
								: DefaultProfile
						}
						alt=""
						className={styles.profileImage}
						draggable={false}
					/>

					<div className={styles.meta}>
						<div className={styles.titleContainer}>
							<h1>게시글 제목</h1>
							<input
								type="text"
								className={styles.titleInput}
								placeholder="이 게시글의 제목을 입력해주세요."
								value={title}
								onChange={onChangeTitle}
							/>
						</div>

						<div className={styles.thumnailContainer}>
							<If condition={!!thumnail}>
								<Then>
									<h1>프리뷰</h1>
									<PostItem
										id={1}
										postTitle={title}
										createdAt={todayDateFormatter}
										updatedAt={todayDateFormatter}
										postThumnail={thumnail && URL.createObjectURL(thumnail)}
										user={{ username: authState.myInfo.username }}
										overviewMode
										like={[]}
									/>
								</Then>
								<Else>
									<h1>게시글 썸네일</h1>
									<input
										type="file"
										className={styles.thumnailInput}
										onChange={onChangeThumnail}
										ref={thumnailInputRef}
										accept="image/png, image/jpeg"
										multiple={false}
									/>
									<button
										onClick={handleOpenThumnailInput}
										className={styles.thumnailButton}
									>
										<AiOutlinePlusCircle size="2rem" />
									</button>
								</Else>
							</If>
						</div>

						<div className={styles.options}>
							<button
								className={isEmptyContent ? styles.notAllow : styles.submit}
								onClick={handleSubmit}
								disabled={isEmptyContent}
							>
								출간하기
							</button>
							{thumnail && (
								<button
									className={styles.cancel}
									onClick={() => setThumnail(null)}
								>
									취소
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Editor;
