import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';

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
}
