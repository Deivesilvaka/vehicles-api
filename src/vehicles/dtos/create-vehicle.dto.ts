import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsValidYearLength } from '@src/vehicles/decorators/is-valid-year.decorator';

export class CreateVehicleDto {
  @ApiProperty({
    example: faker.vehicle.vrm(),
  })
  @IsString()
  @IsNotEmpty()
  @Length(7, 8, {
    message: 'The plate must have 7 or 8 characters',
  })
  licensePlate: string;

  @ApiProperty({
    example: faker.vehicle.vin(),
  })
  @IsString()
  @IsNotEmpty()
  @Length(17)
  chassis: string;

  @ApiProperty({
    example: faker.string.alphanumeric({ length: 11 }).toUpperCase(),
  })
  @IsString()
  @IsNotEmpty()
  @Length(11)
  renavam: string;

  @ApiProperty({
    example: faker.vehicle.model(),
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  model: string;

  @ApiProperty({
    example: faker.vehicle.manufacturer(),
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  brand: string;

  @ApiProperty({
    example: '12',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsValidYearLength()
  @Transform(({ value }) => Number(value.length === 2 ? `19${value}` : value))
  year: string;
}
