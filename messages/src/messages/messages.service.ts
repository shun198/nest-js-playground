import { MessagesRepository } from './messages.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MessageService {
  constructor(public messagesRepo: MessagesRepository) {
    this.messagesRepo = messagesRepo
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id)
  }

  findAll() {
    return this.messagesRepo.findAll()
  }

  create(content: string) {
    return this.messagesRepo.create(content)
  }
}
