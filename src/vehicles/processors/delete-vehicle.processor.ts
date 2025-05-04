import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsEnum } from '@src/vehicles/enums/events.enum';
import { Job } from 'bull';
import { CrmProvider } from '@src/shared/providers/crmProvider/crm.provider';
ConfigModule.forRoot();

@Processor(process.env.VEHICLE_QUEUE as string)
export class DeleteVehicleProcessor {
  constructor(private readonly crmProvider: CrmProvider) {}

  private readonly logger = new Logger(DeleteVehicleProcessor.name);

  @Process(EventsEnum.DELETE)
  async handleDeleteVehicle(job: Job<string>) {
    const vehicle = job.data;

    this.logger.log(`Processing vehicle with id: ${vehicle}`);

    await this.crmProvider.deleteVehicle(vehicle);

    this.logger.log(`Vehicle with id: ${vehicle} just deleted to crm!`);
  }

  @OnQueueFailed({ name: EventsEnum.DELETE })
  handleError(error: Error) {
    this.logger.log(
      `[${DeleteVehicleProcessor.name}]: Failed to delete vehicle data`,
      error,
    );
  }
}
