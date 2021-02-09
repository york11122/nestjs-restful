import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '@core/auth/auth.service';
import { loginUserInput, AuthTokens } from './auth.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login (@Body() param: loginUserInput): Promise<AuthTokens> {
        let { account, password } = param
        return await this.authService.login(account, password)
    }

    @Post('line')
    async oauthLine (@Body() token: string, @Req() req, @Res() res): Promise<AuthTokens> {
        req.body = {
            ...req.body,
            access_token: token
        }
        return await this.authService.oauthLine(req, res)
    }

    @Post('facebook')
    async oauthFacebook (@Body() token: string, @Req() req, @Res() res): Promise<AuthTokens> {
        req.body = {
            ...req.body,
            access_token: token
        }
        return await this.authService.oauthFacebook(req, res)
    }

    @Post('google')
    async oauthGoogle (@Body() token: string, @Req() req, @Res() res): Promise<AuthTokens> {
        req.body = {
            ...req.body,
            access_token: token
        }
        return await this.authService.oauthGoogle(req, res)
    }
}
