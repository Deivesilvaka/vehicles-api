import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from '@src/vehicles/services/vehicles.service';
import { VehicleRepository } from '@src/vehicles/repositories/vehicle.repository';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateVehicleDto } from '@src/vehicles/dtos/create-vehicle.dto';
import { UpdateVehicleDto } from '@src/vehicles/dtos/update-vehicle.dto';
import { EventsEnum } from '@src/vehicles/enums/events.enum';
import { NotFoundException } from '@nestjs/common';

process.env.VEHICLE_QUEUE = 'vehicle_queue';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let vehicleRepository: jest.Mocked<VehicleRepository>;
  let queue: jest.Mocked<Queue>;

  const mockVehicle = {
    id: '1',
    licensePlate: 'ABC1234',
    chassis: '9BWZZZ377VT004251',
    renavam: '12345678901',
    model: 'Gol',
    brand: 'Volkswagen',
    year: '2020',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: VehicleRepository,
          useValue: {
            createVehicle: jest.fn(),
            findVehicleById: jest.fn(),
            find: jest.fn(),
            updateVehicle: jest.fn(),
            deleteById: jest.fn(),
          },
        },
        {
          provide: getQueueToken(process.env.VEHICLE_QUEUE),
          useValue: {
            add: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    vehicleRepository = module.get<VehicleRepository>(
      VehicleRepository,
    ) as jest.Mocked<VehicleRepository>;
    queue = module.get<Queue>(
      getQueueToken(process.env.VEHICLE_QUEUE),
    ) as jest.Mocked<Queue>;
  });

  describe('createVehicle', () => {
    it('should create a vehicle and add to queue', async () => {
      const createVehicleDto: CreateVehicleDto = {
        licensePlate: 'ABC1234',
        chassis: '9BWZZZ377VT004251',
        renavam: '12345678901',
        model: 'Gol',
        brand: 'Volkswagen',
        year: '2020',
      };

      vehicleRepository.createVehicle.mockResolvedValue(mockVehicle);

      const result = await service.createVehicle(createVehicleDto);

      expect(vehicleRepository.createVehicle).toHaveBeenCalledWith(
        createVehicleDto,
      );
      expect(queue.add).toHaveBeenCalledWith(EventsEnum.CREATE, mockVehicle);
      expect(result).toEqual(mockVehicle);
    });
  });

  describe('deleteVehicleById', () => {
    it('should delete a vehicle and add to queue', async () => {
      const vehicleId = '1';
      vehicleRepository.deleteById.mockResolvedValue({ affected: 1 } as any);

      const result = await service.deleteVehicleById(vehicleId);

      expect(vehicleRepository.deleteById).toHaveBeenCalledWith(vehicleId);
      expect(queue.add).toHaveBeenCalledWith(EventsEnum.DELETE, vehicleId);
      expect(result).toEqual({ vehicleId });
    });

    it('should not throw error if vehicle does not exist', async () => {
      const vehicleId = '999';
      vehicleRepository.deleteById.mockResolvedValue({ affected: 0 } as any);

      await expect(service.deleteVehicleById(vehicleId)).resolves.toEqual({
        vehicleId,
      });
    });
  });

  describe('updateVehicle', () => {
    it('should update a vehicle and add to queue', async () => {
      const vehicleId = '1';
      const updateVehicleDto: UpdateVehicleDto = {
        model: 'Gol 1.0',
      };

      const updatedVehicle = {
        ...mockVehicle,
        ...updateVehicleDto,
      };

      vehicleRepository.findVehicleById.mockResolvedValue(mockVehicle);
      vehicleRepository.updateVehicle.mockResolvedValue(updatedVehicle);

      const result = await service.updateVehicle(vehicleId, updateVehicleDto);

      expect(vehicleRepository.findVehicleById).toHaveBeenCalledWith(vehicleId);
      expect(vehicleRepository.updateVehicle).toHaveBeenCalledWith(
        updatedVehicle,
      );
      expect(queue.add).toHaveBeenCalledWith(EventsEnum.UPDATE, updatedVehicle);
      expect(result).toEqual({ id: vehicleId, vehicleData: updateVehicleDto });
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      const vehicleId = '999';
      const updateVehicleDto: UpdateVehicleDto = {
        model: 'Gol 1.0',
      };

      vehicleRepository.findVehicleById.mockResolvedValue(null);

      await expect(
        service.updateVehicle(vehicleId, updateVehicleDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getVehicleById', () => {
    it('should return a vehicle by id', async () => {
      const vehicleId = '1';
      vehicleRepository.findVehicleById.mockResolvedValue(mockVehicle);

      const result = await service.getVehicleById(vehicleId);

      expect(vehicleRepository.findVehicleById).toHaveBeenCalledWith(vehicleId);
      expect(result).toEqual(mockVehicle);
    });

    it('should throw NotFoundException if vehicle not found', async () => {
      const vehicleId = '999';
      vehicleRepository.findVehicleById.mockResolvedValue(null);

      await expect(service.getVehicleById(vehicleId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getVehicles', () => {
    it('should return an array of vehicles', async () => {
      const vehicles = [mockVehicle];
      vehicleRepository.find.mockResolvedValue(vehicles);

      const result = await service.getVehicles();

      expect(vehicleRepository.find).toHaveBeenCalled();
      expect(result).toEqual(vehicles);
    });

    it('should return empty array if no vehicles found', async () => {
      vehicleRepository.find.mockResolvedValue([]);

      const result = await service.getVehicles();

      expect(result).toEqual([]);
    });
  });
});
