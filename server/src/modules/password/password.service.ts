import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Password } from './schema/password.schema';

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


  findAll() {
    return `This action returns all password`;
  }

  findOne(id: number) {
    return `This action returns a #${id} password`;
  }

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} password`;
  }

  remove(id: number) {
    return `This action removes a #${id} password`;
  }
}
