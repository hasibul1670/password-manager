
import { Reflector } from '@nestjs/core';
import { Injectable } from '@nestjs/common';
import { JwtTokenGeneratorService } from '../helpers/JwtTokenGeneratorService';
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtTokenGeneratorService, private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['refreshToken']; // Change this to check cookies

        if (!token) {
            throw new UnauthorizedException('You are not logged in! Please log in.');
        }
        try {
            const user = this.jwtService.decodeToken(token);
            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
