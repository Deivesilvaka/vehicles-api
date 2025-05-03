import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@src/config/dataSource';
import { ThrottlerProvider } from '@src/shared/providers/throttler/throttler.provider';
import { VehiclesModule } from '@src/vehicles/vehicle.module';
import { BullModule } from '@nestjs/bull';
ConfigModule.forRoot();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    VehiclesModule,
  ],
  controllers: [AppController],
  providers: [ThrottlerProvider],
})
export class AppModule {}
