import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Password } from './schema/password.schema';
import { generateId } from '../../common/utils/generateId';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class PasswordService {
  constructor(@InjectModel(Password.name) private passwordModel: Model<Password>) { }

  async create(createPasswordDto: CreatePasswordDto): Promise<CreatePasswordDto> {
    const lastDoc = await this.passwordModel.countDocuments();
    const passwordId = await generateId(lastDoc, 'P');
    const res = await this.passwordModel.create(
      { ...createPasswordDto, passwordId });
    return res;
  }
  async findAll(email: string) {
    const res = await this.passwordModel.find({ email:email }).exec();
    return res;
  }

  async findOne(id: string) {
    const res = await this.passwordModel.findById(id);
    return res;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const res = await this.passwordModel.findByIdAndUpdate(
      id,
      updatePasswordDto,
      { new: true }
    );
    return res;

  }

  async remove(id: string) {
    const result = await this.passwordModel.findByIdAndDelete(id);
    return result;
  }
}
