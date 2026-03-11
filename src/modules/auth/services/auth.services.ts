import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'
import { comparePassword } from 'src/modules/user/services/password.services'
import { Repository } from 'typeorm'
import { USER_ERROR } from 'src/utils/errors'
import { JwtService } from './jwt.services'
import { AuthToken } from 'src/models/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private authTokenRepository: Repository<AuthToken>,
    private jwtService: JwtService,
  ) {}
  async loginUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email })
    if (user?.isActive === false) {
      throw new Error(USER_ERROR.INACTIVE)
    }
    if (user && (await comparePassword(password, user.password))) {
      await this.jwtService.generateToken(user)
      return user
    } else {
      throw new Error(USER_ERROR.NOT_FOUND)
    }
  }
  async activateAccount(token: string): Promise<User | null> {
    const authRecord = await this.authTokenRepository.findOneBy({ token: token })

    if (!authRecord) {
      throw new Error(USER_ERROR.NOT_FOUND)
    }

    const payload = this.jwtService.verifyToken(token)
    if (!payload) {
      throw new Error(USER_ERROR.NOT_FOUND)
    }

    if (new Date() > authRecord.expiration) {
      await this.authTokenRepository.remove(authRecord)
      throw new Error('Token has expired')
    }

    const user = await this.userRepository.findOneBy({ email: authRecord.email })
    if (!user) {
      throw new Error(USER_ERROR.NOT_FOUND)
    }
    user.isActive = true
    const activatedUser = await this.userRepository.save(user)
    await this.authTokenRepository.remove(authRecord)

    return activatedUser
  }
}
