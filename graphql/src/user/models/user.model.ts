import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'ユーザID' })
  id: number;

  @Field({ description: '名前' })
  name: string;

  @Field({ description: 'メールアドレス' })
  email: string;

  @HideField()
  password: string;

  @Field({ description: '作成日' })
  createdAt: Date;

  @Field({ description: '更新日' })
  updatedAt: Date;
}
