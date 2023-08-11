import { Entity, Column } from 'typeorm';

import { AbstractEntity } from '../../../common/entities/abstract.entity';

import { Level } from '../enums/level.enum';
import { Status } from '../enums/status.enum';
import { Type } from '../enums/type.enum';

@Entity()
export class Clue extends AbstractEntity {
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
}
