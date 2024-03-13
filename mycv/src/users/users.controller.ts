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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { HttpCode, NotFoundException, UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
  /**
   * ユーザを新規登録するAPI
   * @param body - ユーザの情報
   */
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
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
            statusCode: 404,
          },
        ],
      },
    },
  })
  /**
   * ユーザを詳細表示するAPI
   * @param id - ユーザのID
   */
  @UseInterceptors(SerializeInterceptor)
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
            password: 'test',
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
            statusCode: 404,
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
            statusCode: 404,
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
