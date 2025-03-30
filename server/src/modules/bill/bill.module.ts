import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantsMiddleware } from 'src/middleware/tenants.middleware';
import { tenantModels } from 'src/providers/tenant-models.provider';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

@Module({
  controllers: [BillController],
  providers: [BillService, tenantModels.billModel],
})
export class BillModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantsMiddleware).forRoutes(BillController);
  }
}
