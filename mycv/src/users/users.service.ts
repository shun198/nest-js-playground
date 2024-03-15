import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  /**
   * 該当するユーザを取得
   * @param id - ユーザのID
   * @returns ユーザのオブジェクト
   */
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  /**
   * 該当するユーザをすべて取得
   * @param email - ユーザのメールアドレス
   * @returns ユーザのオブジェクト
   */
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  /**
   * 該当するユーザを更新
   * @param id - ユーザのID
   * @param attrs - ユーザの属性
   * @returns ユーザのオブジェクト
   */
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('該当するIDを持つユーザが存在しません');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  /**
   * 該当するユーザを削除
   * @param id - ユーザのID
   * @returns ユーザのオブジェクト
   */
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('該当するIDを持つユーザが存在しません');
    }
    return this.repo.remove(user);
  }
}
