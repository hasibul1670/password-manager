import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdminDto {
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString({ message: 'userName must be a string' })
  @IsNotEmpty({ message: 'userName is required' })
  userName: string;

  @IsOptional()
  @IsString({ message: 'role must be a string' })
  @IsNotEmpty({ message: 'role is required' })
  role: string;

  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsMongoId({ message: 'tenantId must be a valid MongoDB ObjectId' })
  @IsNotEmpty({ message: 'tenantId is required' })
  tenantId: string;

  @IsMongoId({ message: 'module must be a valid MongoDB ObjectId' })
  @IsNotEmpty({ message: 'module is required' })
  module: string;

  @IsBoolean({ message: 'isActive must be a boolean value' })
  @IsNotEmpty({ message: 'isActive is required' })
  isActive: boolean;

  @IsArray({ message: 'allowedModule must be an array of strings' })
  @IsString({
    each: true,
    message: 'Each item in allowedModule must be a string',
  })
  @IsNotEmpty({ each: true, message: 'Each item in allowedModule is required' })
  allowedModule: string[];

  @IsString({ message: 'createdBy must be a valid MongoDB ObjectId' })
  @IsNotEmpty({ message: 'createdBy is required' })
  createdBy: string;

  @IsString({ message: 'approvedBy must be a valid MongoDB ObjectId' })
  @IsNotEmpty({ message: 'approvedBy is required' })
  approvedBy: string;
}
