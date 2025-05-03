import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateVehicleDto } from '@src/vehicles/dtos/create-vehicle.dto';
import { VehicleRepository } from '@src/vehicles/repositories/vehicle.repository';
import { EventsEnum } from '@src/vehicles/enums/events.enum';
import { Queue } from 'bull';
ConfigModule.forRoot();

@Injectable()
export class VehiclesService {
  constructor(
    @InjectQueue(process.env.VEHICLE_QUEUE)
    private readonly queue: Queue,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async createVehicle(createVehicleDto: CreateVehicleDto) {
    const vehicle =
      await this.vehicleRepository.createVehicle(createVehicleDto);

    await this.queue.add(EventsEnum.CREATE, vehicle);

    return vehicle;
  }

  async deleteVehicleById(vehicleId: string) {
    await this.vehicleRepository.deleteById(vehicleId);
    return { vehicleId };
  }
}
