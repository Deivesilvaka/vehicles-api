import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsEnum } from '@src/vehicles/enums/events.enum';
import { Job } from 'bull';
import { VehicleEntity } from '@src/vehicles/entities/vehicle.entity';
ConfigModule.forRoot();

@Processor(process.env.VEHICLE_QUEUE as string)
export class CreateVehicleProcessor {
  private readonly logger = new Logger(CreateVehicleProcessor.name);

  @Process(EventsEnum.CREATE)
  async handleCreateVehicle(job: Job<VehicleEntity>) {
    const vehicle = job.data;

    this.logger.log(`Processando veículo criado: ${vehicle.licensePlate}`);

    this.logger.log(vehicle);

    this.logger.log(`Veículo criado: ${vehicle.licensePlate} salvo!`);
  }

  @OnQueueFailed({ name: EventsEnum.CREATE })
  handleError(error: Error) {
    this.logger.log(
      `[${CreateVehicleProcessor.name}]: Erro ao savar dados de vehiculo`,
      error,
    );
  }
}
