import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenGeneratorService {
  constructor(private readonly jwtService: JwtService) {}
  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
  }
  decodeToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
  }
}
