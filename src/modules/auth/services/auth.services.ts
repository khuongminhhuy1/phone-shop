import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'
import { comparePassword } from 'src/modules/user/services/password.services'
import { Repository } from 'typeorm'
import { USER_ERROR } from 'src/utils/errors'
import { JwtService } from './jwt.services'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email })
    if (user && (await comparePassword(password, user.password))) {
      await this.jwtService.generateToken(user)
      return user
    } else {
      throw new Error(USER_ERROR.NOT_FOUND)
    }
  }
}
