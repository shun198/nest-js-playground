import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('Auth Serviceのインスタンスを作成できる', async () => {
    expect(service).toBeDefined();
  });

  it('ソルト&ハッシュ化されたパスワードを持つユーザを作成', async () => {
    const user = await service.signup('example.com', 'test');
    expect(user.password).not.toEqual('test');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('すでに使用されたメールアドレスでサインアップした時', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'example.com', password: 'test' } as User,
      ]);
    await expect(service.signup('example.com', 'test')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('登録されていないメールアドレスでサインインした時', async () => {
    await expect(service.signin('not_found_email.com', 'test')).rejects.toThrow(
      BadRequestException,
    );
  });
});
