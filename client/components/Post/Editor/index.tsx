import React, { useCallback, useEffect, useState } from "react";
import styles from "./editor.module.scss";
import { BsCode, BsEyeFill } from "react-icons/bs";
import { If, Then } from "react-if";
import useInput from "../../../hooks/useInput";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css";
import { useAuthState } from "../../../contexts/AuthContext";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import { createPostRequest } from "../../../apis/post";
import { useRouter } from "next/router";

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

  const [isEmptyContent, setIsEmptyContent] = useState<boolean>(true);
  const [title, onChangeTitle, setTitle] = useInput("");
  const [code, onChangeCode, setCode] = useInput("");
  const [editorMode, setEditorMode] = useState<"EDIT" | "PREVIEW">("EDIT");
  const [createPostSuccess, setCreatePostSuccess] = useState(false);

  const authState = useAuthState();

  const handleSubmit = useCallback(async () => {
    const postData = {
      title,
      code,
    };
    const data = await createPostRequest(postData);

    setCreatePostSuccess(true);
    setTitle("");
    setCode("");

    localStorage.removeItem("editorContent");

    router.push("/");
  }, [title, code]);

  useEffect(() => {
    const interval = setInterval(() => {
      if ((title || code) && !createPostSuccess) {
        const editorData = JSON.stringify({
          title,
          code,
        });

        localStorage.setItem("editorContent", editorData);
      }
    }, 2000);

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

  if (!authState.myInfo) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        <header className={styles.header}>
          <ul className={styles.menus}>
            <li
              className={editorMode === "EDIT" ? styles.active : ""}
              onClick={() => setEditorMode("EDIT")}
            >
              <BsCode className={styles.icon} />
              Edit
            </li>
            <li
              className={editorMode === "PREVIEW" ? styles.active : ""}
              onClick={() => setEditorMode("PREVIEW")}
            >
              <BsEyeFill className={styles.icon} />
              Preview
            </li>
          </ul>
        </header>

        <div className={styles.editor}>
          <If condition={editorMode === "EDIT"}>
            <Then>
              <textarea
                className={styles.codeMirror}
                value={code}
                onChange={onChangeCode}
              />
            </Then>
          </If>

          <If condition={editorMode === "PREVIEW"}>
            <Then>
              <div
                className={`${styles.preview}`}
                dangerouslySetInnerHTML={{ __html: markdownIt.render(code) }}
              />
            </Then>
          </If>
        </div>

        <div className={styles.metaContainer}>
          <img
            src={authState.myInfo.profileUrl || DefaultProfile}
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
            <div className={styles.options}>
              <button
                className={isEmptyContent ? styles.notAllow : styles.submit}
                onClick={handleSubmit}
                disabled={isEmptyContent}
              >
                출간하기
              </button>
              <button className={styles.cancel}>취소</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Editor;
