import { PostType } from "../../../types/Post";
import { If, Else, Then } from "react-if";
import dateFormatter from "../../../utils/formatter/date-format";
import styles from "./postView.module.scss";
import DefaultProfile from "../../../assets/svg/default_profile.svg";
import CommentInput from "../../Comment/CommentInput";
import CommentList from "../../Comment/CommentList";
import { usePostState } from "../../../contexts/PostContext";
import React from "react";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css";

interface IPostViewProps {
  post: PostType;
}

const PostView: React.FunctionComponent<IPostViewProps> = (props) => {
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

  const { post } = props;
  const { postTitle, createdAt, updatedAt } = post;

  const { comments } = usePostState();

  return (
    <React.Fragment>
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
            <div className={`${styles.profileInfo}`}>
              <div className={styles.profile}>
                <img
                  src={post.user.profileUrl || DefaultProfile}
                  alt={post.user.username}
                  className={styles.profileImage}
                />
                <span className={styles.username}>{post.user.username}</span>
                <button className={styles.subscribe}>구독</button>
              </div>

              <If condition={post.user.selfIntroduction}>
                <Then>
                  <div className={`${styles.intro}`}>
                    <p>{post.user.selfIntroduction}</p>
                  </div>
                </Then>
              </If>
            </div>
          </div>
        </div>

        <section className={styles.content}>
          <img
            src={post.postThumnail}
            className={styles.postThumnail}
            alt={post.postTitle}
          />
          <div
            className={`${styles.text}`}
            dangerouslySetInnerHTML={{
              __html: markdownIt.render(post.postContent),
            }}
          />
        </section>
      </main>
      <CommentInput />
      <CommentList comments={comments} />
    </React.Fragment>
  );
};

export default PostView;
