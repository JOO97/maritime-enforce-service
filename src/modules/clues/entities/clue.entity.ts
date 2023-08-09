import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Level } from '../enums/level.enum';
import { Status } from '../enums/status.enum';

@Entity()
export class ClueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  desc: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @Column({
    type: 'enum',
    enum: Level,
  })
  level: Level;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.未受理,
  })
  status: Status;

  @Column({
    type: 'timestamp',
  })
  occTime: number;
}
