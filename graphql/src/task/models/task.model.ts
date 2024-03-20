import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => Int, { description: 'タスクID' })
  id: number;

  @Field({ description: '名前' })
  name: string;

  @Field({ description: '日付' })
  dueDate: string;

  @Field({ description: 'ステータス' })
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

  @Field({ nullable: true, description: '詳細' })
  description: string;
}
