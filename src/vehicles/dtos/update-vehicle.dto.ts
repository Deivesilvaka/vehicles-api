import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsValidYearLength } from '@src/vehicles/decorators/is-valid-year.decorator';
import { faker } from '@faker-js/faker';

export class UpdateVehicleDto {
  @ApiProperty({
    example: faker.vehicle.model(),
  })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({
    example: faker.vehicle.manufacturer(),
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({
    example: '1997',
  })
  @IsOptional()
  @IsNumber()
  @IsValidYearLength()
  @Transform(({ value }) => Number(value.length === 2 ? `19${value}` : value))
  year?: string;
}
