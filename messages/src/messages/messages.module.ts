import { Module } from '@nestjs/common'
import { MessagesController } from './messages.controller'
import { MessageService } from './messages.service'
import { MessagesRepository } from './messages.repository'

@Module({
  controllers: [MessagesController],
  // https://docs.nestjs.com/fundamentals/injection-scopes
  providers: [MessageService, MessagesRepository],
})
export class MessagesModule {}
