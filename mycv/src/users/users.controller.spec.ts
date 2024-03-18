import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'example.com',
          password: 'test',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'test' } as User]);
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUserを実行するとユーザの配列が返されることを確認する', async () => {
    const users = await controller.findAllUsers('example.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('example.com');
  });

  it('findUserを実行するとユーザのオブジェクトが返されることを確認する', async () => {
    const user = await controller.findUser(1);
    expect(user).toBeDefined();
  });

  it('存在しないユーザIDに対してfindUserを実行するとエラーになることを確認する', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser(1)).rejects.toThrow(NotFoundException);
  });

  it('signinメソッドを実行するとsessionオブジェクトが更新され、userオブジェクトを返すことを確認する', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'example.com', password: 'test' },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
