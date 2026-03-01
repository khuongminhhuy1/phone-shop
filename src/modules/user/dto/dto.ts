import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from 'class-validator'
import { USER_ERROR } from '../../../utils/errors.js'

export class CreateUserDto {
  @IsNotEmpty({ message: USER_ERROR.EMAIL_REQUIRED })
  @IsEmail({}, { message: USER_ERROR.INVALID_EMAIL })
  email: string

  @IsNotEmpty({ message: USER_ERROR.PASSWORD_REQUIRED })
  @MinLength(10, { message: USER_ERROR.PASSWORD_TOO_SHORT })
  password: string

  @IsNotEmpty({ message: USER_ERROR.NAME_REQUIRED })
  name: string
}

export class UpdateUserDto {
  @MinLength(10, { message: USER_ERROR.PASSWORD_TOO_SHORT })
  password?: string

  name?: string
}
