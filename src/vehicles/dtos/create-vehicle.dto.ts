import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidYearLength } from '@src/vehicles/decorators/is-valid-year.decorator';

export class CreateVehicleDto {
  @ApiProperty({
    example: 'JQL-1392',
  })
  @IsString()
  @IsNotEmpty()
  @Length(7, 8, {
    message: 'The plate must have 7 or 8 characters',
  })
  licensePlate: string;

  @ApiProperty({
    example: '9BWZZZ377PY123456',
  })
  @IsString()
  @IsNotEmpty()
  @Length(17)
  chassis: string;

  @ApiProperty({
    example: '12536955160',
  })
  @IsString()
  @IsNotEmpty()
  @Length(11)
  renavam: string;

  @ApiProperty({
    example: 'fortwo BRABUS coup',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  model: string;

  @ApiProperty({
    example: 'smart',
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
