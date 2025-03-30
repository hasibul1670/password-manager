import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createApiResponse } from '../../helpers/utills/common-response';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('create-admin')
  async create(@Body() createAdminDto: CreateAdminDto) {
    const result = await this.adminService.create(createAdminDto);
    return createApiResponse(
      'success',
      200,
      'Admin is created successfully.',
      result,
    );
  }

  @Get('all-admin')
  async findAll() {
    const result = await this.adminService.findAll();
    return createApiResponse(
      'success',
      200,
      'Admin is created successfully.',
      result,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    const res = await this.adminService.findOne(id);
    return createApiResponse(
      'success',
      200,
      'Single Admin is Fetched   successfully.',
      res,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: any, @Body() updateAdminDto: UpdateAdminDto) {
    const res = await this.adminService.update(id, updateAdminDto);
    return createApiResponse(
      'success',
      200,
      'Single Admin is Update  successfully.',
      res,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
