import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from '@/core/auth/auth.service';
import { loginUserInput, AuthTokens } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() param: loginUserInput,
    @Res({ passthrough: true }) res,
  ): Promise<AuthTokens> {
    let { account, password } = param;
    const authTokens = await this.authService.login(account, password);
    res.setCookie('access-token', authTokens.accessToken);
    res.setCookie('refresh-token', authTokens.refreshToken);
    return authTokens;
  }

  @Post('line')
  async oauthLine(
    @Body('token') token: string,
    @Req() req,
    @Res({ passthrough: true }) res,
  ): Promise<AuthTokens> {
    req.body = {
      ...req.body,
      access_token: token,
    };
    const authTokens = await this.authService.oauthLine(req, res);
    res.setCookie('access-token', authTokens.accessToken);
    res.setCookie('refresh-token', authTokens.refreshToken);
    return authTokens;
  }

  @Post('facebook')
  async oauthFacebook(
    @Body('token') token: string,
    @Req() req,
    @Res({ passthrough: true }) res,
  ): Promise<AuthTokens> {
    req.body = {
      ...req.body,
      access_token: token,
    };
    const authTokens = await this.authService.oauthFacebook(req, res);
    res.setCookie('access-token', authTokens.accessToken);
    res.setCookie('refresh-token', authTokens.refreshToken);
    return authTokens;
  }

  @Post('google')
  async oauthGoogle(
    @Body('token') token: string,
    @Req() req,
    @Res({ passthrough: true }) res,
  ): Promise<AuthTokens> {
    req.body = {
      ...req.body,
      access_token: token,
    };
    const authTokens = await this.authService.oauthGoogle(req, res);
    res.setCookie('access-token', authTokens.accessToken);
    res.setCookie('refresh-token', authTokens.refreshToken);
    return authTokens;
  }
}
