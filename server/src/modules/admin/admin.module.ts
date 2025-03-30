import { Module } from '@nestjs/common';
import { bcryptPasword } from '../../helpers/bcryptPasword/bcryptPasword';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, bcryptPasword],
})
export class AdminModule {}
