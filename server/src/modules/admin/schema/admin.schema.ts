import { HttpStatus } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, model } from 'mongoose';
import { ApiError } from '../../../helpers/utills/ApiError';
import { CreateAdminDto } from '../dto/create-admin.dto';

@Schema()
export class Admin extends Document implements CreateAdminDto {
  @Prop({ type: String })
  userName: string;
  @Prop({ type: String })
  email: string;
  @Prop({ type: String, default: 'admin' })
  role: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
  tenantId: string;
  @Prop({ type: Types.ObjectId, ref: 'Feature', required: true })
  module: string;
  @Prop({ type: Boolean, required: true })
  isActive: boolean;
  @Prop({ type: String, required: true })
  approvedBy: string;
  @Prop({ type: String, required: true })
  createdBy: string;
  @Prop({ type: [String], required: true })
  allowedModule: string[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.pre('save', async function (next) {
  try {
    const existingAdmin = await AdminModel.findOne({
      $or: [{ email: this.email }, { userName: this.userName }],
    });
    if (existingAdmin) {
      throw ApiError(
        HttpStatus.CONFLICT,
        `An Admin with this email or username already exists: '${this.email}' or '${this.userName}'`,
        'This Admin Already Exists',
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

export const AdminModel = model<CreateAdminDto>('Admin', AdminSchema);
