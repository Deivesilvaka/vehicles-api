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

  async createVehicle(vehicledto: CreateVehicleDto) {
    return this.vehicleRepository.save(vehicledto);
  }

  async deleteById(id: string) {
    return this.vehicleRepository.softDelete(id);
  }
}
