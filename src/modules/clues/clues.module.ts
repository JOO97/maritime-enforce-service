import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClueEntity } from './entities/clue.entity';

import { CluesController } from './clues.controller';
import { CluesService } from './clues.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClueEntity])],
  controllers: [CluesController],
  providers: [CluesService],
  exports: [],
})
export class CluesModule {}
