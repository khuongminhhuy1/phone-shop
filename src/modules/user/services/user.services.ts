import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../../models/user.entity'
import { CreateUserDto, UpdateUserDto } from '../dto/dto'
import { USER_ERROR } from 'src/utils/errors'
import { NotFoundException } from '@nestjs/common'
import { PasswordHashService } from './password.services'
import { JwtService } from 'src/modules/auth/services/jwt.services'
import { AuthToken } from 'src/models/auth.entity'

@Injectable()
export class UserService {
  constructor(
    private passwordHashService: PasswordHashService,
    @InjectRepository(AuthToken)
    private authTokenRepository: Repository<AuthToken>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.passwordHashService.hashPassword(dto.password)
    const createdDate = new Date()
    const user = this.userRepository.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    })
    const verifyToken = this.authTokenRepository.create({
      email: dto.email,
      token: await new JwtService().generateToken({
        id: user.id,
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        createdAt: createdDate,
        updatedAt: createdDate,
        isActive: false,
      }),
      expiration: new Date(Date.now() + 15 * 60 * 1000),
    })
    await this.authTokenRepository.save(verifyToken)
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
