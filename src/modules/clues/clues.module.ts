import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Clue } from './entities/clue.entity';

import { CluesController } from './clues.controller';
import { CluesService } from './clues.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clue])],
  controllers: [CluesController],
  providers: [CluesService],
  exports: [],
})
export class CluesModule {}
