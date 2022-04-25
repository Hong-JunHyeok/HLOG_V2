// import React, {
//   ChangeEvent,
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import styles from "./dragger.module.scss";

// interface IFileType {
//   id: number;
//   object: File;
// }

// const Dragger: React.FunctionComponent = () => {
//   const dragRef = useRef<HTMLLabelElement | null>(null);

//   return (
//     <React.Fragment>
//       <div className={styles.container}>
//         <input
//           type="file"
//           id="fileUpload"
//           className={styles.fileInput}
//           multiple={false}
//         />

//         <label className={styles.label} htmlFor="fileUpload" ref={dragRef}>
//           <div>이미지 업로드</div>
//         </label>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Dragger;
