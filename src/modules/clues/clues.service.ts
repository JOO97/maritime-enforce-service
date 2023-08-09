/**
 * service: 与数据库交互
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClueEntity } from './entities/clue.entity';

import { CluesPaginationDTO } from './dto/clues-pagination.dto';

@Injectable()
export class CluesService {
  constructor(
    @InjectRepository(ClueEntity)
    private readonly cluesRepository: Repository<ClueEntity>,
  ) {}

  findAll(dto: CluesPaginationDTO) {
    return this.cluesRepository.find();
  }
}
