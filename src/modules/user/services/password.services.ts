import bcrypt from 'bcrypt'
import 'dotenv/config'
import { Injectable } from '@nestjs/common'
import { USER_ERROR } from 'src/utils/errors'

@Injectable()
export class PasswordHashService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10')
    return await bcrypt.hash(password, saltRounds)
  }
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    throw new Error(USER_ERROR.PASSWORD_INCORRECT)
  }
}
