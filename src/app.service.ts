import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity.js';
import { CreateUserDto } from './modules/user/dto/dto.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

