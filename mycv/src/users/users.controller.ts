import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';

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
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @ApiResponse({
    status: 200,
    description: 'ユーザ詳細',
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
  @Get('/:id')
  findUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @ApiQuery({
    name: 'email',
    type: 'string',
    description: 'ユーザのメールアドレス(test@gmail.com)',
    required: false,
  })
  @ApiResponse({
    status: 200,
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
  @Get()
  findAllUsers(@Query('email') email?: string) {
    return this.usersService.find(email);
  }

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
    status: 200,
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
  @Patch('/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }
}
