/**
 * service: 与数据库交互
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Clue } from './entities/clue.entity';

import { CluesPaginationDTO } from './dto/clues-pagination.dto';
import { CreateCLueDto } from './dto/create-clue.dto';
import { UpdateCLueDto } from './dto/update-clue.dto';

@Injectable()
export class CluesService {
  constructor(
    @InjectRepository(Clue)
    private readonly cluesRepository: Repository<Clue>,
  ) {}

  findAll(dto: CluesPaginationDTO): Promise<Clue[]> {
    return this.cluesRepository.find();
  }

  create(dto: CreateCLueDto): Promise<Clue> {
    return this.cluesRepository.save(dto);
  }

  update(id: string, dto: UpdateCLueDto) {
    return this.cluesRepository
      .createQueryBuilder()
      .update()
      .set(dto)
      .where('id = :id', { id })
      .execute();
  }

  delete() {
    return 'delete a clue by clue id';
  }

  upgrade() {
    return 'upgrade a clue';
  }

  ignore() {
    return 'ignore a clue';
  }

  keep() {
    return 'keep a clue';
  }
}
