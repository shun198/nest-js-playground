import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import { dump } from 'js-yaml';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // https://github.com/expressjs/session
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        // 1時間（60 × 60 × 1000ミリ秒(1秒)）
        maxAge: 60 * 60 * 1000,
      },
    }),
  );
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Report API Project')
    .setDescription('The Report API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.yaml', dump(document, {}));
  SwaggerModule.setup('api/docs', app, document);
  // Swaggerによるキャッシュ制御を無効にする
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '0');
    next();
  });
  await app.listen(8000);
}
bootstrap();
