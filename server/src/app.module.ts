import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import config from './dbConfig/config';
import { LoggerMiddleware } from './helpers/logger/logger.middleware';
import { RolesGuard } from './helpers/roleGuard/roles.guard';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BillModule } from './modules/bill/bill.module';
import { DatabaseServiceModule } from './modules/database-service/database-service.module';
import { FeaturesModule } from './modules/features/features.module';
import { SuperAdminModule } from './modules/super-admin/super-admin.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || '454ffdf4df5df13d23',
      signOptions: { expiresIn: '60m' },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 12,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    TenantModule,
    UserModule,
    TenantModule,
    AuthModule,
    DatabaseServiceModule,
    SuperAdminModule,
    AdminModule,
    FeaturesModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [JwtModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
