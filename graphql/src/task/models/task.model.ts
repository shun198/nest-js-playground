import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

@ObjectType()
export class Task {
  @Field(() => Int, { description: 'タスクID' })
  id: number;

  @Field({ description: '名前' })
  name: string;

  @Field({ description: '日付' })
  dueDate: string;

  @Field({ description: 'ステータス' })
  status: Status;

  @Field({ nullable: true, description: '詳細' })
  description: string;

  @Field({ description: '作成日' })
  createdAt: Date;

  @Field({ description: '更新日' })
  updatedAt: Date;
}
