import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number | string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedTime: Date;
}
