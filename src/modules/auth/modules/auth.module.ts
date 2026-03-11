import { Module } from '@nestjs/common'
import { AuthController } from '../controllers/auth.controller'
import { AuthService } from '../services/auth.services'
import { JwtService } from '../services/jwt.services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'
import { AuthToken } from 'src/models/auth.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, AuthToken])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
