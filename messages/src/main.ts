import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { MessagesModule } from './messages/messages.module'

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule)
  app.useGlobalPipes(new ValidationPipe())
  // extend schemaのドキュメントだと思われる
  // https://medium.com/@amitgal45/nest-js-open-api-just-saves-so-much-time-part-2-6e64a76f2be7
  const config = new DocumentBuilder()
    .setTitle('Message API Project')
    .setDescription('The message API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  await app.listen(3000)
}
bootstrap()
