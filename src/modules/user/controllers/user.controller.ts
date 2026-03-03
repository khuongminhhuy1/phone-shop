import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { UserService } from '../services/user.services'
import { CreateUserDto, UpdateUserDto } from 'src/modules/user/dto/dto'
import { USER_MESSAGES } from 'src/utils/messages'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll() {
    return {
      users: this.userService.findAll(),
    }
  }
  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.userService.create(body)
    return {
      message: USER_MESSAGES.USER_CREATED,
      user: body,
    }
  }
  @Put(':id')
  async update(@Body() body: UpdateUserDto, @Param('id') id: number) {
    await this.userService.update(body, id)
    return {
      message: USER_MESSAGES.USER_UPDATED,
      user: await this.userService.findOne(id),
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.userService.delete(id)
    return {
      message: USER_MESSAGES.USER_DELETED,
      id,
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    await this.userService.findOne(id)
    return {
      user: this.userService.findOne(id),
    }
  }
}
