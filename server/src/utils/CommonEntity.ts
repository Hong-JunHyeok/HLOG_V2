import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Common {
  @PrimaryGeneratedColumn("increment")
  public id: number;

  @CreateDateColumn({
    name: "createdAt",
    comment: "컬럼 생성시간",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updatedAt",
    comment: "컬럼 업데이트 시간",
  })
  updatedAt: Date;
}
