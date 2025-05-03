import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from '@src/vehicles/entities/vehicle.entity';
import { VehicleRepository } from '@src/vehicles/repositories/vehicle.repository';
import { VehicleController } from '@src/vehicles/controllers/vehicle.controller';
import { VehiclesService } from '@src/vehicles/services/vehicles.service';
import { CreateVehicleProcessor } from '@src/vehicles/processors/create-vehicle.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
    BullModule.registerQueue({
      name: process.env.VEHICLE_QUEUE,
      defaultJobOptions: { attempts: 2 },
    }),
  ],
  controllers: [VehicleController],
  providers: [VehicleRepository, VehiclesService, CreateVehicleProcessor],
})
export class VehiclesModule {}
