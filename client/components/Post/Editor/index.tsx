import React, { useEffect, useState } from "react";
import styles from "./editor.module.scss";
import { BsCode, BsEyeFill } from "react-icons/bs";
import { If, Then } from "react-if";
import useInput from "../../../hooks/useInput";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css";

const Editor = () => {
  const markdownIt = new MarkdownIt({
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return "";
    },
  });

  const [code, onChangeCode] = useInput("");
  const [editorMode, setEditorMode] = useState<"EDIT" | "PREVIEW">("EDIT");

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("editorContent", code);
    }, 2000);

    return () => clearInterval(interval);
  }, [code]);

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
                className={`${styles.preview} markdown-body`}
                dangerouslySetInnerHTML={{ __html: markdownIt.render(code) }}
              />
            </Then>
          </If>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Editor;
