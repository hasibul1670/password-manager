/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ApiError } from 'src/helpers/utills/ApiError';
import { createApiResponse } from 'src/helpers/utills/common-response';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw ApiError(
        HttpStatus.UNAUTHORIZED,
        `You are Unauthorized!! Please Login With Admin Credentials`,
        `You are Unauthorized!! Please Login With Admin Credentials`,
      );
    }
    const [bearer, token] = authorizationHeader.split(' ');
    const decodedToken: any = jwt.decode(token);
    const tenantId = decodedToken?.tenantId?._id;
    if (createUserDto.tenantId != tenantId) {
      throw ApiError(
        HttpStatus.UNAUTHORIZED,
        `You haven't Permission to Add  User in that Tenant`,
        `You haven't Permission to Add  User in that Tenant`,
      );
    }
    const res = await this.userService.create(createUserDto);
    return createApiResponse(
      'success',
      200,
      'User is created successfully.',
      res,
    );
  }

  @Get('all-user-admin')
  findAllForAdmin(@Req() req: Request) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw ApiError(
        HttpStatus.UNAUTHORIZED,
        `You are Unauthorized!! Please Login With Admin Credentials`,
        `You are Unauthorized!! Please Login With Admin Credentials`,
      );
    }
    const [bearer, token] = authorizationHeader.split(' ');
    const decodedToken: any = jwt.decode(token);
    const tenantId = decodedToken?.tenantId?._id;
    return this.userService.findAllForAdmin(tenantId);
  }

  @Get('all-user-superadmin')
  findAllForSuperAdmin(@Req() req: Request) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      throw ApiError(
        HttpStatus.UNAUTHORIZED,
        `You are Unauthorized!! Please Login With Admin Credentials`,
        `You are Unauthorized!! Please Login With Admin Credentials`,
      );
    }
    const [bearer, token] = authorizationHeader.split(' ');
    const decodedToken: any = jwt.decode(token);
    const role = decodedToken?.role;
    if (role !== 'superAdmin') {
      throw ApiError(
        HttpStatus.UNAUTHORIZED,
        `You are Unauthorized!! Please Login With SuperAdmin Credentials`,
        `You are Unauthorized!! Please Login With SuperAdmin Credentials`,
      );
    }
    return this.userService.findAllForSuperAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
