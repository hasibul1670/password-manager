import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Auth } from './schema/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { bcryptPassword } from '../../common/helpers/bcryptPassword';
import { JwtTokenGeneratorService } from '../../common/helpers/JwtTokenGeneratorService';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>,
    private readonly bcryptPassword: bcryptPassword,
    private readonly jwtTokenService: JwtTokenGeneratorService,) { }

  async createOTPInDB(createAuthDto: CreateAuthDto): Promise<any> {
    const { email, ...rest } = createAuthDto;

    const res = await this.authModel.updateOne(
      { email },
      {
        $set: {
          ...rest,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return res;
  }

  async verifyOTP(verifyOTPDto: { email: string; otp: string }): Promise<any> {
    const { email, otp } = verifyOTPDto;

    const user = await this.authModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found.');
    if (!user.otpExpiresAt || user.otpExpiresAt < new Date())
      throw new UnauthorizedException('OTP expired.');
    if (user.otpAttempts >= 3)
      throw new UnauthorizedException('Too many OTP attempts.');

    const isOtpValid = await bcrypt.compare(otp, user.otp);
    if (!isOtpValid) {
      await this.authModel.updateOne(
        { email },
        { $inc: { otpAttempts: 1 }, $set: { updatedAt: new Date() } }
      );
      throw new BadRequestException('Invalid OTP.');
    }

    // ✅ OTP verified
    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtTokenService.generateAccessToken(payload)
    const refreshToken = this.jwtTokenService.generateRefreshToken(payload);

    // 🔒 Hash tokens before storing
    const hashedAccessToken = await this.bcryptPassword.hashPassword(accessToken);
    const hashedRefreshToken = await this.bcryptPassword.hashPassword(refreshToken);

    await this.authModel.updateOne(
      { email },
      {
        $set: {
          isOtpVerified: true,
          otpAttempts: 0,
          otp: null,
          otpExpiresAt: null,
          accessToken: hashedAccessToken,
          accessTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
          refreshToken: hashedRefreshToken,
          refreshTokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date()
        }
      }
    );

    
    return {
      accessToken,
      refreshToken,
      email: user.email,
      message: 'OTP verified and tokens generated successfully.'
    };
  }

findAll() {
  return `This action returns all auth`;
}

findOne(id: number) {
  return `This action returns a #${id} auth`;
}

update(id: number, updateAuthDto: UpdateAuthDto) {
  return `This action updates a #${id} auth`;
}

remove(id: number) {
  return `This action removes a #${id} auth`;
}
}
