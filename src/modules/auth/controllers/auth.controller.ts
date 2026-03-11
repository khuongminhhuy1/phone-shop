import { Get, Post, Body, Put, Delete, Param, Controller } from '@nestjs/common'
import { AuthService } from '../services/auth.services'

@Controller('auth') 

export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async loginUser(@Body() body: { email: string; password: string }) {
        const { email, password } = body
        const user = await this.authService.loginUser(email, password)
        return {
            message: 'Login successful',
            user,
        }
    }

    @Post('activate')
    async activateAccount(@Body() body: { token: string }) {
        const { token } = body
        const user = await this.authService.activateAccount(token)
        return {
            message: 'Account activated successfully',
            user,
        }
    }
}