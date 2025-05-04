import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { STATUS_CODES } from 'http';
import { CreateVehicleDto } from '@src/vehicles/dtos/create-vehicle.dto';
import { VehiclesService } from '@src/vehicles/services/vehicles.service';
import { UpdateVehicleDto } from '@src/vehicles/dtos/update-vehicle.dto';

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

  @Get(':vehicleId')
  @ApiOperation({ summary: 'Find vehicle by id' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  async getVehicleById(
    @Param('vehicleId', new ParseUUIDPipe()) vehicleId: string,
  ) {
    return this.vehiclesService.getVehicleById(vehicleId);
  }

  @Get('')
  @ApiOperation({ summary: 'Find all vehicles' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  async getVehicles() {
    return this.vehiclesService.getVehicles();
  }

  @Delete(':vehicleId')
  @ApiOperation({ summary: 'Delete vehicle' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  async deleteVehicle(
    @Param('vehicleId', new ParseUUIDPipe()) vehicleId: string,
  ) {
    return this.vehiclesService.deleteVehicleById(vehicleId);
  }

  @Patch(':vehicleId')
  @ApiOperation({ summary: 'Edit vehicle data' })
  @ApiOkResponse({ description: STATUS_CODES[HttpStatus.OK] })
  @ApiNotFoundResponse({ description: STATUS_CODES[HttpStatus.NOT_FOUND] })
  @ApiBody({
    type: UpdateVehicleDto,
  })
  async updateVehicle(
    @Param('vehicleId', new ParseUUIDPipe()) vehicleId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehiclesService.updateVehicle(vehicleId, updateVehicleDto);
  }
}
