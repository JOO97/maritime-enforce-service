import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Level } from '../enums/level.enum';
import { Status } from '../enums/status.enum';
import { Type } from '../enums/type.enum';

@Entity()
export class Clue {
  @PrimaryGeneratedColumn('uuid')
  id: number | string;

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
    enum: Type,
    default: Type.leadingEnd,
  })
  type: Type;

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
  occTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedTime: Date;
}
