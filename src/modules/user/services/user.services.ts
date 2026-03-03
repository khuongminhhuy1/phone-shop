import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../../models/user.entity'
import { CreateUserDto, UpdateUserDto } from '../dto/dto'
import { USER_ERROR } from 'src/utils/errors'
import { USER_MESSAGES } from 'src/utils/messages'
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create({
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return this.userRepository.save(user)
  }

  async findOne(id: number): Promise<User | null> {
    if (!id) {
      throw new NotFoundException(USER_ERROR.NOT_FOUND)
    }
    return await this.userRepository.findOneBy({ id })
  }

  async update(dto: UpdateUserDto, id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id: id })
    if (!user) {
      throw new NotFoundException(USER_ERROR.NOT_FOUND)
    }
    await this.userRepository.update({ id }, { ...dto, updatedAt: new Date() })
    return await this.userRepository.save(user)
  }
  async delete(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: id })
    if (!user) {
      throw new NotFoundException(USER_ERROR.NOT_FOUND)
    }
    await this.userRepository.delete({ id })
    return
  }
}
