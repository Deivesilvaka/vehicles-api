import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { CreateVehicleDto } from '@src/vehicles/dtos/create-vehicle.dto';
import { VehiclesService } from '@src/vehicles/services/vehicles.service';

@ApiTags('Vehicles')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehiclesService: VehiclesService) {}
  @Post('')
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiCreatedResponse({ description: STATUS_CODES[HttpStatus.CREATED] })
  @ApiConflictResponse({ description: STATUS_CODES[HttpStatus.CONFLICT] })
  @ApiBody({
    type: CreateVehicleDto,
  })
  async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(createVehicleDto);
  }

  @Delete(':vehicleId')
  @ApiOperation({ summary: 'Delete vehicle' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  async deleteVehicle(
    @Param('vehicleId', new ParseUUIDPipe()) vehicleId: string,
  ) {
    return this.vehiclesService.deleteVehicleById(vehicleId);
  }
}
