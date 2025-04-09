import { Response } from 'express';
import { AuthService } from './auth.service';
import { generateOtp } from '../../common/utils/otp';
import { MailService } from '../mail/mail.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { bcryptPassword } from '../../common/helpers/bcryptPassword';
import { createApiResponse } from '../../common/utils/common-response';
import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly bcryptPassword: bcryptPassword, private mailService: MailService) { }


  @Post('send-otp')
  
  async sendMail(@Body() body: { email: string, passwordId: string },
  ) {
    const genOTP = generateOtp();
    try {
      await this.mailService.sendOtpEmail(
        body.email,
        genOTP
      );
      const hashedOTP = await this.bcryptPassword.hashPassword(genOTP);
      const createAuthDto = {
        email: body.email,
        otp: hashedOTP,
        otpExpiresAt: new Date(Date.now() + 1500 * 60 * 1000),
        isOtpVerified: false,
        accessToken: null,
        accessTokenExpiresAt: null,
        refreshToken: null,
        refreshTokenExpiresAt: null,
        otpAttempts: 0,
        passwordId: body.passwordId
      };
      await this.authService.createOTPInDB(createAuthDto);
      return createApiResponse('success', 200, 'Email sent to email successfully', null);
    } catch (error) {
      return createApiResponse('error', 400, error.message || 'Failed to send email', null);
    }
  }

  @Post('verify-otp')
  async verifyOTP(@Body() verifyOTPDto: { email: string; otp: string }, @Res({ passthrough: true }) res: Response) {
    try {
      const result = await this.authService.verifyOTP(verifyOTPDto);
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
      });
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.cookie('email', result.email, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      return createApiResponse('success', 200, result.email, null);
    } catch (error) {
      return createApiResponse(
        'error',
        error.status || 500,
        error.message || 'Something went wrong during OTP verification',
        null
      );
    }
  }


  @Post('logout')
  async adminLogOut(
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    response.clearCookie('email', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return createApiResponse(
      'success',
      200,
      'User has been logged out successfully.',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
