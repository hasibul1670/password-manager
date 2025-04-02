import { MailService } from '../mail/mail.service';
import { PasswordService } from './password.service';
import { generateOtp } from '../../common/utils/otp';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { createApiResponse } from '../../common/utils/common-response';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';

@Controller('password')
export class PasswordController {
  constructor(
    private readonly passwordService: PasswordService,
    private mailService: MailService
  ) { }

  @Post('send-mail')
  async sendMail(@Body() body: { email: string, passwordId: string }) {
    const genOTP = generateOtp();
    try {
      await this.mailService.sendOtpEmail(
        body.email,
        genOTP
      );
      return createApiResponse('success', 200, 'Email sent to email successfully', null);
    } catch (error) {
      return createApiResponse('error', 400, error.message || 'Failed to send email', null);
    }
  }


  @Post('create-password')
  async create(@Body() createPasswordDto: CreatePasswordDto) {
    try {
      const result = await this.passwordService.create(createPasswordDto);
      return createApiResponse('success', 201, 'Password created successfully', result);
    } catch (error) {
      return createApiResponse('error', 400, error.message || 'Failed to create password', null);
    }
  }



  @Get("all-password")
  findAll() {
    const res = this.passwordService.findAll();
    return createApiResponse('success', 200, 'Passwords retrieved successfully', res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const res = this.passwordService.findOne(id);
    return createApiResponse('success', 200, 'Password retrieved successfully', res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    const res = this.passwordService.update(id, updatePasswordDto);
    return createApiResponse('success', 200, 'Password updated successfully', res);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Invalid ID provided', HttpStatus.FORBIDDEN);
    }
    const find = await this.passwordService.findOne(id);
    if (!find) {
      throw new NotFoundException('Password not found');
    }
    try {
      const res = await this.passwordService.remove(id);
      return createApiResponse('success', 200, 'Password deleted successfully', res);
    } catch (error) {
      throw new HttpException('Failed to delete password', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
