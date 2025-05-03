import { BaseEntity } from '@src/shared/database/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('vehicles')
export class VehicleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 8, unique: true, name: 'plate' })
  licensePlate: string;

  @Column({ type: 'varchar', length: 17, unique: true, name: 'chasis' })
  chassis: string;

  @Column({ type: 'varchar', length: 11, unique: true, name: 'renavam' })
  renavam: string;

  @Column({ type: 'varchar', length: 50, name: 'model' })
  model: string;

  @Column({ type: 'varchar', length: 50, name: 'brand' })
  brand: string;

  @Column({ type: 'varchar', length: 4, name: 'year' })
  year: string;
}
