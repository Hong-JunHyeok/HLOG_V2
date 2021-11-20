import { PostType } from "../../../types/Post";
import styles from "./postView.module.scss";

interface IPostViewProps {
  post: PostType;
}

const PostView: React.FunctionComponent<IPostViewProps> = (props) => {
  const { post } = props;
  const { postTitle } = post;

  console.log(post);

  return (
    <>
      <div className={styles.meta}>
        <h1 className={styles.title}>{postTitle}</h1>
        <div className={styles.info}>
          <img src={""} alt="" />
        </div>
      </div>

      <section className={styles.content}></section>

      <footer className={styles.footer}></footer>
    </>
  );
};

export default PostView;
