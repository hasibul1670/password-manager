import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { createApiResponse } from 'src/helpers/utills/common-response';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('create-bill')
  async create(@Body() createBillDto: CreateBillDto) {
    const result = await this.billService.create(createBillDto);
    return createApiResponse(
      'success',
      200,
      'BIll is created successfully.',
      result,
    );
  }

  @Get()
  async findAll(
    @Query('page') page: any,
    @Query('limit') limit: any,
    @Query('search') search?: any,
  ) {
    const res = await this.billService.findAll({ page, limit, search });
    return createApiResponse(
      'success',
      200,
      'All Bill is Fetched successfully.',
      res,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    const res = await this.billService.findOne(id);
    return createApiResponse(
      'success',
      200,
      'Single Bill is Fetched   successfully.',
      res,
    );
  }

  @Patch(':id')
  async update(@Param('id') id: any, @Body() updateBillDto: UpdateBillDto) {
    const res = this.billService.update(id, updateBillDto);
    return createApiResponse(
      'success',
      200,
      ' Bill is Updated successfully.',
      res,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: any) {
    const res = await this.billService.remove(id);
    return createApiResponse(
      'success',
      200,
      ' Bill is Deleted successfully.',
      res,
    );
  }
}
