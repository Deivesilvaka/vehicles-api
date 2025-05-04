import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleEntity } from '@src/vehicles/entities/vehicle.entity';
import { CreateVehicleDto } from '@src/vehicles/dtos/create-vehicle.dto';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async findVehicleById(id: string): Promise<VehicleEntity | null> {
    return this.vehicleRepository.findOne({ where: { id } });
  }

  async find(): Promise<VehicleEntity[] | null> {
    return this.vehicleRepository.find();
  }

  async updateVehicle(vehicle: VehicleEntity) {
    return this.vehicleRepository.save(vehicle);
  }

  async createVehicle(vehicleDto: CreateVehicleDto) {
    return this.vehicleRepository.save(vehicleDto);
  }

  async deleteById(id: string) {
    return this.vehicleRepository.softDelete(id);
  }
}
