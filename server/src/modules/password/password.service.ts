import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Password } from './schema/password.schema';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class PasswordService {
  constructor(@InjectModel(Password.name) private passwordModel: Model<Password>) { }
  async create(createPasswordDto: CreatePasswordDto): Promise<CreatePasswordDto> {
    try {
      const res = await this.passwordModel.create(createPasswordDto);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async findAll() {
    const res = await this.passwordModel.find();
    return res;
  }
  async findOne(id: number) {
    const res = await this.passwordModel.findById(id);
    return res;
  }
  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    const res = this.passwordModel.findByIdAndUpdate(id, updatePasswordDto);
    return res;
  }
  remove(id: number) {
    const res = this.passwordModel.findByIdAndDelete(id);
    return res;
  }
}
