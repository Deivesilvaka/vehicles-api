import { InjectQueue } from '@nestjs/bull';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateVehicleDto } from '@src/vehicles/dtos/create-vehicle.dto';
import { VehicleRepository } from '@src/vehicles/repositories/vehicle.repository';
import { EventsEnum } from '@src/vehicles/enums/events.enum';
import { UpdateVehicleDto } from '@src/vehicles/dtos/update-vehicle.dto';
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
    await this.queue.add(EventsEnum.DELETE, vehicleId);
    return { vehicleId };
  }

  async updateVehicle(id: string, vehicleData: UpdateVehicleDto) {
    const vehicle = await this.vehicleRepository.findVehicleById(id);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found!');
    }

    const newVehicleData = {
      ...vehicle,
      ...vehicleData,
    };

    await this.vehicleRepository.updateVehicle(newVehicleData);

    await this.queue.add(EventsEnum.UPDATE, newVehicleData);

    return { id, vehicleData };
  }

  async getVehicleById(id: string) {
    const vehicle = await this.vehicleRepository.findVehicleById(id);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found!');
    }

    return vehicle;
  }

  async getVehicles() {
    return this.vehicleRepository.find();
  }
}
