import { PostType } from "../../../types/Post";
import { If, Else, Then } from "react-if";
import dateFormatter from "../../../utils/formatter/date-format";
import styles from "./postView.module.scss";
import DefaultProfile from "../../../assets/svg/default_profile.svg";

interface IPostViewProps {
  post: PostType;
}

const PostView: React.FunctionComponent<IPostViewProps> = (props) => {
  const { post } = props;
  const { postTitle, createdAt, updatedAt } = post;

  return (
    <>
      <main className={styles.container}>
        <div className={styles.meta}>
          <h1 className={styles.title}>{postTitle}</h1>
          <div className={styles.info}>
            <If condition={updatedAt !== createdAt}>
              <Then>
                <span className={styles.date}>
                  최근 수정됨 : {dateFormatter(updatedAt)}
                </span>
              </Then>
              <Else>
                <span className={styles.date}>
                  작성일 : {dateFormatter(createdAt)}
                </span>
              </Else>
            </If>
            <div className={styles.profileInfo}>
              <div className={styles.profile}>
                <img
                  src={post.user.profileUrl || DefaultProfile}
                  alt={post.user.username}
                  className={styles.profileImage}
                />
                <span className={styles.username}>{post.user.username}</span>
              </div>
              <p className={styles.intro}>{post.user.selfIntroduction}</p>
            </div>
          </div>
        </div>

        <section className={styles.content}>
          <img src={post.postThumnail} alt={post.postTitle} />
          <p
            className={styles.text}
            dangerouslySetInnerHTML={{
              __html: post.postContent,
            }}
          />
        </section>
      </main>
    </>
  );
};

export default PostView;
