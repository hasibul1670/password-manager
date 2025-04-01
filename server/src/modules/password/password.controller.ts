import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { createApiResponse } from 'src/common/utils/common-response';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PasswordService } from './password.service';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) { }

  @Post('create-password')
  async create(@Body() createPasswordDto: CreatePasswordDto) {
    try {
      const result = await this.passwordService.create(createPasswordDto);
      return createApiResponse('success', 201, 'Password created successfully', result);
    } catch (error) {
      return createApiResponse('error', 400, error.message || 'Failed to create password', null);
    }
  }

  @Get()
  findAll() {
    return this.passwordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.update(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordService.remove(+id);
  }
}
