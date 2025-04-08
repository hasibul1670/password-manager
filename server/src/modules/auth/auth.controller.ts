import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { generateOtp } from 'src/common/utils/otp';
import { createApiResponse } from '../../common/utils/common-response';
import { MailService } from '../mail/mail.service';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private mailService: MailService) { }


  @Post('send-otp')
  async sendMail(@Body() body: { email: string, passwordId: string }) {
    const genOTP = generateOtp();
    try {
      await this.mailService.sendOtpEmail(
        body.email,
        genOTP
      );
      const createAuthDto = {
        email: body.email,
        otp: genOTP,
        otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000),
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
  verifyOTP(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.verifyOTP(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
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
