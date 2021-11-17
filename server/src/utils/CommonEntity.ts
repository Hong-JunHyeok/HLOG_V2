import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class Common extends BaseEntity {
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
