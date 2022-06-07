import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { Post } from "./Post";
import { User } from "./User";
import { Like } from "./Like";
import { Reply } from "./Reply";

@Entity({
  name: "comments",
  database: process.env.DB_NAME,
})
export class Comment extends Common {
  @Column({ nullable: false, comment: "게시글의 제목" })
  commentContent: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  post: Post;

  @OneToMany(() => Reply, (reply) => reply.comment, {
    nullable: true,
    cascade: true,
  })
  reply: Reply[];
}
