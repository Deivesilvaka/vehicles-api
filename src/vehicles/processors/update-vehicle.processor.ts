import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsEnum } from '@src/vehicles/enums/events.enum';
import { Job } from 'bull';
import { VehicleEntity } from '@src/vehicles/entities/vehicle.entity';
import { CrmProvider } from '@src/shared/providers/crmProvider/crm.provider';
ConfigModule.forRoot();

@Processor(process.env.VEHICLE_QUEUE as string)
export class UpdateVehicleProcessor {
  constructor(private readonly crmProvider: CrmProvider) {}

  private readonly logger = new Logger(UpdateVehicleProcessor.name);

  @Process(EventsEnum.UPDATE)
  async handleUpdateVehicle(job: Job<VehicleEntity>) {
    const vehicle = job.data;

    this.logger.log(`Processing vehicle: ${vehicle.licensePlate}`);

    await this.crmProvider.updateVehicle(vehicle);

    this.logger.log(`Vehicle: ${vehicle.licensePlate} updated to crm!`);
  }

  @OnQueueFailed({ name: EventsEnum.UPDATE })
  handleError(error: Error) {
    this.logger.log(
      `[${UpdateVehicleProcessor.name}]: Failed to update vehicle data`,
      error,
    );
  }
}
