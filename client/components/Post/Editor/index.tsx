import React, { CSSProperties, useState } from "react";
import styles from "./editor.module.scss";
import { BsCode, BsEyeFill } from "react-icons/bs";
import { If, Then } from "react-if";

const Editor = () => {
  const [editorMode, setEditorMode] = useState<"EDIT" | "PREVIEW">("EDIT");

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
              <textarea className={styles.codeMirror} />
            </Then>
          </If>

          <If condition={editorMode === "PREVIEW"}>
            <Then></Then>
          </If>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Editor;
