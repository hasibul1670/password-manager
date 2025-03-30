import {
  Contains,
  IsArray,
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { VALIDATION_MESSAGES } from 'src/helpers/validatorMessage/validator-messages';

export class CreateUserDto {
  @IsEmail({}, { message: `Email${VALIDATION_MESSAGES.IS_EMAIL}` })
  @IsNotEmpty({ message: `Email${VALIDATION_MESSAGES.IS_REQUIRED}` })
  email: string;

  @IsString({ message: `First name${VALIDATION_MESSAGES.IS_STRING}` })
  @IsNotEmpty({ message: `First name${VALIDATION_MESSAGES.IS_REQUIRED}` })
  firstName: string;

  @IsString({ message: `Last name${VALIDATION_MESSAGES.IS_STRING}` })
  @IsNotEmpty({ message: `Last name${VALIDATION_MESSAGES.IS_REQUIRED}` })
  lastName: string;

  @Contains('user')
  @IsString({ message: `Role${VALIDATION_MESSAGES.IS_STRING}` })
  @IsNotEmpty({ message: `Role${VALIDATION_MESSAGES.IS_REQUIRED}` })
  role: string;

  @IsString({ message: `Password${VALIDATION_MESSAGES.IS_STRING}` })
  @IsNotEmpty({ message: `Password${VALIDATION_MESSAGES.IS_REQUIRED}` })
  password: string;

  @IsString({ message: `Phone number${VALIDATION_MESSAGES.IS_STRING}` })
  @IsNotEmpty({ message: `Phone number${VALIDATION_MESSAGES.IS_REQUIRED}` })
  phoneNumber: string;

  @IsString({ message: `Profile picture${VALIDATION_MESSAGES.IS_STRING}` })
  @IsNotEmpty({ message: `Profile picture${VALIDATION_MESSAGES.IS_REQUIRED}` })
  profilePicture: string;

  @IsBoolean({ message: `IsActive${VALIDATION_MESSAGES.IS_BOOLEAN}` })
  @IsNotEmpty({ message: `IsActive${VALIDATION_MESSAGES.IS_REQUIRED}` })
  isActive: boolean;

  @IsMongoId({ message: `IsTenant Id ${VALIDATION_MESSAGES.IS_MONGO}` })
  @IsNotEmpty({ message: 'tenantId is required' })
  tenantId: string;

  @IsArray({ message: 'allowedModule must be an array of strings' })
  @IsString({
    each: true,
    message: 'Each item in allowedModule must be a string',
  })
  @IsNotEmpty({ each: true, message: 'Each item in allowedModule is required' })
  allowedModule: string[];

  @IsMongoId({ message: `createdBy  ${VALIDATION_MESSAGES.IS_MONGO}` })
  @IsNotEmpty({ message: 'createdBy is required' })
  createdBy: string;

  @IsMongoId({ message: `approvedBy Id ${VALIDATION_MESSAGES.IS_MONGO}` })
  @IsNotEmpty({ message: 'approvedBy is required' })
  approvedBy: string;
}
