/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtTokenGeneratorService } from '../../helpers/JwtTokenGeneratorService/JwtTokenGeneratorService';
import { bcryptPasword } from '../../helpers/bcryptPasword/bcryptPasword';
import { ApiError } from '../../helpers/utills/ApiError';
import { AdminModel } from '../admin/schema/admin.schema';
import { SuperAdminModel } from '../super-admin/schema/super-admin.schema';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: bcryptPasword,
    private readonly jwtTokenService: JwtTokenGeneratorService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const admin = await AdminModel.findOne({ email: email }).populate(
      'tenantId',
    );
    if (
      !admin ||
      !(await this.passwordService.comparePasswords(password, admin.password))
    ) {
      throw ApiError(
        HttpStatus.UNAUTHORIZED,
        'Invalid credentials',
        'Invalid credentials',
      );
    }
    const { password: _, ...adminWithoutPassword } = admin.toObject();

    const payload = { ...adminWithoutPassword };
    const accessToken = this.jwtTokenService.generateAccessToken(payload);
    const refreshToken = this.jwtTokenService.generateRefreshToken(payload);

    return {
      admin: adminWithoutPassword,
      accessToken,
      refreshToken,
    };
  }
  async loginSuperAdmin(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const admin = await SuperAdminModel.findOne({ email: email });
    if (
      !admin ||
      !(await this.passwordService.comparePasswords(password, admin.password))
    ) {
      throw ApiError(
        HttpStatus.UNAUTHORIZED,
        'Invalid credentials',
        'Invalid credentials',
      );
    }
    const { password: _, ...adminWithoutPassword } = admin.toObject();

    const payload = { ...adminWithoutPassword };
    const accessToken = this.jwtTokenService.generateAccessToken(payload);
    const refreshToken = this.jwtTokenService.generateRefreshToken(payload);

    return {
      admin: adminWithoutPassword,
      accessToken,
      refreshToken,
    };
  }
}
