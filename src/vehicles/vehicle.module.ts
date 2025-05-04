import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from '@src/vehicles/entities/vehicle.entity';
import { VehicleRepository } from '@src/vehicles/repositories/vehicle.repository';
import { VehicleController } from '@src/vehicles/controllers/vehicle.controller';
import { VehiclesService } from '@src/vehicles/services/vehicles.service';
import { BullModule } from '@nestjs/bull';
import { CrmModule } from '@src/shared/providers/crmProvider/crm-provider.module';
import { CreateVehicleProcessor } from '@src/vehicles/processors/create-vehicle.processor';
import { DeleteVehicleProcessor } from '@src/vehicles/processors/delete-vehicle.processor';
import { UpdateVehicleProcessor } from '@src/vehicles/processors/update-vehicle.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleEntity]),
    BullModule.registerQueue({
      name: process.env.VEHICLE_QUEUE,
      defaultJobOptions: { attempts: 2 },
    }),
    CrmModule,
  ],
  controllers: [VehicleController],
  providers: [
    VehicleRepository,
    VehiclesService,
    CreateVehicleProcessor,
    DeleteVehicleProcessor,
    UpdateVehicleProcessor,
  ],
})
export class VehiclesModule {}
