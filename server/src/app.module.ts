import config from './config/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PasswordModule } from './modules/password/password.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';


@Module({
  imports: [
    //
    // 🌐 Global Config
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),

    //
    // 🛡 Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('throttle.ttl', 60000),
          limit: configService.get<number>('throttle.limit', 12),
        },
      ],
    }),

    //
    // 🧩 MongoDB Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.url'),
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('✅ MongoDB connected successfully');
          });
          connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
          });
          return connection;
        },
      }),
    }),

    //
    // 🔐 JWT Config (only if globally needed)
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.accessExpiresIn'),
        },
      }),
    }),

    //
    // 📦 Feature Modules
    AuthModule,
    PasswordModule,
    MailModule,
  ],

  controllers: [AppController],

  providers: [
    //
    // 🛡 Global Rate Limiting Guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}