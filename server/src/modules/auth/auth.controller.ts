import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { createApiResponse } from '../../helpers/utills/common-response';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
// Controller !! 
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('admin-login')

  async adminLogIn(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const data = await this.authService.login(loginAuthDto);
    const { refreshToken, accessToken, admin } = data;
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 150 * 24 * 60 * 60 * 1000,
    });
    return createApiResponse(
      'success',
      200,
      'Admin is logged in successfully.',
      { accessToken, admin },
    );
  }

  @Post('logout')
  async adminLogOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return createApiResponse(
      'success',
      200,
      'User has been logged out successfully.',
    );
  }

  @Post('super-admin-login')
  async superAdminLogin(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const data = await this.authService.loginSuperAdmin(loginAuthDto);
    const { refreshToken, accessToken, admin } = data;
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 150 * 24 * 60 * 60 * 1000,
    });
    return createApiResponse(
      'success',
      200,
      'Super Admin is logged in successfully.',
      { accessToken, admin },
    );
  }
}
