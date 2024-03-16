import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Query,
  HttpStatus,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HttpCode, NotFoundException } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('users')
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) { }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          default: 'test@gmail.com',
        },
        password: {
          type: 'string',
          default: 'test',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'ユーザ登録',
    content: {
      'application/json': {
        example: [
          {
            id: 1,
            email: 'test@gmail.com',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '該当するユーザが存在しないとき',
    content: {
      'application/json': {
        example: [
          {
            message: 'すでに使用されているメールアドレスです',
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          },
        ],
      },
    },
  })
  /**
   * ユーザを新規登録するAPI
   * @param body - ユーザの情報
   */
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/user_info')
  userInfo(@CurrentUser() user: User) {
    return user;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          default: 'test@gmail.com',
        },
        password: {
          type: 'string',
          default: 'test',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ログインAPI',
    content: {
      'application/json': {
        example: [
          {
            id: 1,
            email: 'test@gmail.com',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'メールアドレスまたはパスワードが間違っている時',
    content: {
      'application/json': {
        example: [
          {
            message: 'メールアドレスもしくはパスワードが間違っています',
            error: 'Bad Request',
            statusCode: HttpStatus.BAD_REQUEST,
          },
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    console.log(session);
    return user;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ユーザ詳細',
    content: {
      'application/json': {
        example: [
          {
            id: 1,
            email: 'test@gmail.com',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '該当するユーザが存在しないとき',
    content: {
      'application/json': {
        example: [
          {
            message: '該当するIDを持つユーザが存在しません',
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
          },
        ],
      },
    },
  })
  /**
   * ユーザを詳細表示するAPI
   * @param id - ユーザのID
   */
  @Get('/:id')
  async findUser(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('該当するIDを持つユーザが存在しません');
    }
    return this.usersService.findOne(id);
  }

  @ApiQuery({
    name: 'email',
    type: 'string',
    description: 'ユーザのメールアドレス(test@gmail.com)',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ユーザ一覧',
    content: {
      'application/json': {
        example: [
          {
            id: 1,
            email: 'test@gmail.com',
          },
        ],
      },
    },
  })
  /**
   * ユーザを一覧表示するAPI
   * @param id - ユーザのID
   * @param email - ユーザのメールアドレス
   */
  @Get()
  @UseGuards(AuthGuard)
  findAllUsers(@Query('email') email?: string) {
    return this.usersService.find(email);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'ユーザ削除',
    content: {
      'application/json': {
        example: [
          {
            email: 'test02@gmail.com',
            password: 'test',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '該当するユーザが存在しないとき',
    content: {
      'application/json': {
        example: [
          {
            message: '該当するIDを持つユーザが存在しません',
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
          },
        ],
      },
    },
  })
  /**
   * ユーザを削除するAPI
   * @param id - ユーザのID
   */
  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          default: 'test2@gmail.com',
        },
        password: {
          type: 'string',
          default: 'test',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ユーザ編集',
    content: {
      'application/json': {
        example: [
          {
            id: 2,
            email: 'test2@gmail.com',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: '該当するユーザが存在しないとき',
    content: {
      'application/json': {
        example: [
          {
            message: '該当するIDを持つユーザが存在しません',
            error: 'Not Found',
            statusCode: HttpStatus.NOT_FOUND,
          },
        ],
      },
    },
  })
  /**
   * ユーザを更新するAPI
   * @param id - ユーザのID
   * @param body - ユーザの情報
   */
  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
