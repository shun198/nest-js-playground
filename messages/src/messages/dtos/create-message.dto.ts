import { IsString } from 'class-validator'

// jsonをCreateMessageDtoのインスタンスにキャストする
export class CreateMessageDto {
  // contentのvalueがstringかバリデーションを行う
  @IsString()
  content: string
}
