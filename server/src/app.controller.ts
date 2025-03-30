import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  @Get()
  getStatus(): string {
    return 'MS-Saas Server is running on !!! BY NestJS';
  }
}
