import { Injectable } from '@nestjs/common';
import { bcryptPasword } from '../../helpers/bcryptPasword/bcryptPasword';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminModel } from './schema/admin.schema';

@Injectable()
export class AdminService {
  constructor(private readonly passwordService: bcryptPasword) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      createAdminDto.password,
    );
    const adminData = {
      ...createAdminDto,
      password: hashedPassword,
    };
    const res = await AdminModel.create(adminData);
    return res;
  }

  async findAll() {
    const res = await AdminModel.find({}).populate('tenantId');
    return res;
  }

  async findOne(id: number) {
    const res = (
      await AdminModel.findOne({ userName: id }).populate('tenantId')
    ).populate('module');
    return res;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const res = await AdminModel.findByIdAndUpdate(id, updateAdminDto, {
      new: true,
    });
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
