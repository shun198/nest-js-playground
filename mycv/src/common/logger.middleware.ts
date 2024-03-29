import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    response.on('finish', () => {
      const { statusCode } = response;
      // ログレベル、ハンドラー名、時刻、ログIDを追加したい
      this.logger.log(`${ip} ${method} ${originalUrl} ${statusCode}`);
    });
    next();
  }
}
