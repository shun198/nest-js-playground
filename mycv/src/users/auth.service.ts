import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('すでに使用されているメールアドレスです');
    }
    // saltを作成
    const salt = randomBytes(8).toString('hex');
    // saltとパスワードをハッシュ化
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // ハッシュ化した値とsaltを組み合わせる
    const hashedPassword = salt + '.' + hash.toString('hex');
    // ユーザを作成
    const user = await this.userService.create(email, hashedPassword);
    return user;
  }

  signin() {

  }
}
