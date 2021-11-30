import React, { CSSProperties, useState } from "react";
import styles from "./editor.module.scss";
import { BsCode, BsEyeFill } from "react-icons/bs";

const Editor = () => {
  const [editorMode, setEditorMode] = useState<"EDIT" | "PREVIEW">("EDIT");

  //   const activeStyle: CSSProperties = {
  //     backgroundColor: "#ffffff",
  //     borderRadius: "5px 5px 0 0",
  //     fontWeight: "600",
  //     borderLeft: "1px solid #d0d7de",
  //     borderRight: "1px solid #d0d7de",
  //   };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <header className={styles.header}>
          <ul className={styles.menus}>
            <li
              className={editorMode === "EDIT" ? styles.active : ""}
              //   style={editorMode === "EDIT" ? activeStyle : null}
              onClick={() => setEditorMode("EDIT")}
            >
              <BsCode className={styles.icon} />
              Edit
            </li>
            <li
              className={editorMode === "PREVIEW" ? styles.active : ""}
              //   style={editorMode === "PREVIEW" ? activeStyle : null}
              onClick={() => setEditorMode("PREVIEW")}
            >
              <BsEyeFill className={styles.icon} />
              Preview
            </li>
          </ul>
        </header>
        <div className={styles.editor}></div>
      </div>
    </React.Fragment>
  );
};

export default Editor;
