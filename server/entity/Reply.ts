import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Common } from "../utils/CommonEntity";
import { User } from "./User";
import { Like } from "./Like";
import { Comment } from "./Comment";

@Entity({
  name: "replies",
  database: process.env.DB_NAME,
})
export class Reply extends Common {
  @Column({ nullable: false, comment: "댓글의 답글" })
  commentContent: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  comment: Comment;

  @OneToMany(() => Like, (like) => like.comment, {
    nullable: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  like: Like[];
}
