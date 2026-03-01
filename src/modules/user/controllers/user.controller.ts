import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { UserService } from '../services/user.services.js'
import { CreateUserDto, UpdateUserDto } from 'src/modules/user/dto/dto.js'
import { USER_MESSAGES } from 'src/utils/messages.js'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return {
      users: this.userService.findAll(),
    }
  }
  @Post()
  create(@Body() body: CreateUserDto) {
    return {
      message: USER_MESSAGES.USER_CREATED,
      user: body,
    }
  }
  @Put(':id')
  update(@Body() body: UpdateUserDto, @Param('id') id: number) {
    return {
      message: USER_MESSAGES.USER_UPDATED,
      user: this.userService.update(body, id),
    }
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: USER_MESSAGES.USER_DELETED,
      id,
    }
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return {
      user: this.userService.findOne(id),
    }
  }
}
