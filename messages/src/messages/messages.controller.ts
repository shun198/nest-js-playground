import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common'
import { CreateMessageDto } from './dtos/create-message.dto'
import { MessageService } from './messages.service'

@Controller('messages')
export class MessagesController {
  messagesService: MessageService

  constructor() {
    this.messagesService = new MessageService()
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll()
  }

  @Post()
  createMessages(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content)
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id)

    if (!message) {
      throw new NotFoundException('message not found')
    }

    return message
  }
}