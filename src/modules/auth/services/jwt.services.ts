import jwt from 'jsonwebtoken'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from 'src/models/user.entity'
import 'dotenv/config'

interface JwtPayload {
  id: number
  name: string
  email?: string
}

@Injectable()
export class JwtService {
  async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = { id: user.id, name: user.name, email: user.email }
    return jwt.sign(payload, process.env.JWT_SECRET || 'default-secret', {
      expiresIn: '1h',
    })
  }
  verifyToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET || 'default-secret') as JwtPayload
    } catch (error) {
      return null
    }
  }
}
