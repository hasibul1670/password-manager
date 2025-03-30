/* eslint-disable prettier/prettier */
// validation-pipe.config.ts

import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

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
