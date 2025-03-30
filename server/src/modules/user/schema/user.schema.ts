import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model, Types } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

@Schema()
export class User extends Document implements CreateUserDto {
  @Prop({ type: String })
  firstName: string;
  @Prop({ type: String })
  lastName: string;
  @Prop({ type: String })
  email: string;
  @Prop({ type: String })
  phoneNumber: string;
  @Prop({ type: String })
  password: string;
  @Prop({ type: Boolean })
  isActive: boolean;
  @Prop({ type: String })
  profilePicture: string;
  @Prop({ type: String, default: 'user' })
  role: string;
  @Prop({ type: Types.ObjectId, ref: 'Tenant', required: true })
  tenantId: string;
  @Prop({ type: Array })
  allowedModule: string[];
  @Prop({ type: String })
  createdBy: string;
  @Prop({ type: String })
  approvedBy: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model<CreateUserDto>('User', UserSchema);
