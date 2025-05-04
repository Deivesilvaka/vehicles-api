import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { VehicleEntity } from '@src/vehicles/entities/vehicle.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CrmProvider {
  constructor(private readonly httpService: HttpService) {}

  async createVehicle(vehicle: VehicleEntity): Promise<VehicleEntity> {
    try {
      const { data: response } = await firstValueFrom(
        this.httpService.post(`/vehicles`, vehicle),
      );

      return response;
    } catch (err) {
      throw new BadRequestException('Failed to save!');
    }
  }

  async deleteVehicle(id: string) {
    try {
      const { data: response } = await firstValueFrom(
        this.httpService.delete(`/vehicles/${id}`),
      );

      return response;
    } catch (err) {
      throw new BadRequestException('Failed to delete!');
    }
  }

  async updateVehicle(vehicle: VehicleEntity) {
    try {
      const { data: response } = await firstValueFrom(
        this.httpService.patch(`/vehicles/${vehicle.id}`, vehicle),
      );

      return response;
    } catch (err) {
      throw new BadRequestException('Failed to update!');
    }
  }
}
