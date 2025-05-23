import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsEnum } from '@src/vehicles/enums/events.enum';
import { Job } from 'bull';
import { VehicleEntity } from '@src/vehicles/entities/vehicle.entity';
import { CrmProvider } from '@src/shared/providers/crmProvider/crm.provider';
ConfigModule.forRoot();

@Processor(process.env.VEHICLE_QUEUE as string)
export class CreateVehicleProcessor {
  constructor(private readonly crmProvider: CrmProvider) {}

  private readonly logger = new Logger(CreateVehicleProcessor.name);

  @Process(EventsEnum.CREATE)
  async handleCreateVehicle(job: Job<VehicleEntity>) {
    const vehicle = job.data;

    this.logger.log(`Processing vehicle: ${vehicle.licensePlate}`);

    await this.crmProvider.createVehicle(vehicle);

    this.logger.log(`Vehicle: ${vehicle.licensePlate} saved to crm!`);
  }

  @OnQueueFailed({ name: EventsEnum.CREATE })
  handleError(error: Error) {
    this.logger.log(
      `[${CreateVehicleProcessor.name}]: Failed to save vehicle data`,
      error,
    );
  }
}
