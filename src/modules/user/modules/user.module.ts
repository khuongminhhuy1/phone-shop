import { Module } from '@nestjs/common'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'
import { AuthToken } from 'src/models/auth.entity'
import { PasswordHashService } from '../services/password.services'

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthToken])],
  controllers: [UserController],
  providers: [UserService, PasswordHashService],
})
export class UserModule {}
