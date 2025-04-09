import { ValidationError } from 'class-validator';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

export const validationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const formattedErrors = errors.map((error) => {
      const constraints = Object.values(error.constraints || {}).join(', ');
      return `Property: ${error.property} - ${constraints}`;
    });

    console.log('🚀 ~ Validation Errors:', formattedErrors.join(' | '));

    // Optionally, you can throw an error to return to the client
    throw new BadRequestException(formattedErrors);
  },
});
