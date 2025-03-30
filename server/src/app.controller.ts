import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  getStatus(): string {
    return 'Password-App Server is running on! Powered by NestJS';
  }
}
