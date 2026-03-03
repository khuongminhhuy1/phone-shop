import { Module } from '@nestjs/common'
import { UserController } from '../controllers/user.controller'
import { UserService } from '../services/user.services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/models/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
