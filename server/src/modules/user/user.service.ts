import { Injectable } from '@nestjs/common';
import { ApiError } from 'src/helpers/utills/ApiError';
import { findUnique } from 'src/helpers/utills/findUnique';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './schema/user.schema';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const findUser = await findUnique(UserModel, 'email', createUserDto.email);
    try {
      if (!findUser) {
        const result = await UserModel.create(createUserDto);
        return result;
      }
    } catch (error) {
      ApiError(400, 'error', error.message);
    }
  }

  async findAllForAdmin(tenantId: string) {
    const result = await UserModel.find({ tenantId: tenantId }).populate(
      'tenantId',
    );
    return result;
  }
  async findAllForSuperAdmin() {
    return await UserModel.find().populate('tenantId');
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('🚀 ~ UserService ~ update ~ updateUserDto:', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
