import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  // Patch,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
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
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'ユーザを詳細',
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
  findUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get()
  @ApiQuery({
    name: 'email',
    type: 'string',
    description: 'ユーザのメールアドレス(test@gmail.com)',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: '該当するメールアドレスを持つユーザを表示',
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
  findAllUsers(@Query('email') email?: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
