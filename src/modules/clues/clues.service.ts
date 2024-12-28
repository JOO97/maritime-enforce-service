/**
 * service: 与数据库交互
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { isEmpty } from 'lodash';

import { PaginatedDTO } from '../../common/dtos/paginated.dto';
import { BizException } from '../../common/exceptions';
import { ERR_REQ_FIELD_ERROR } from '../../common/return-code';

import { Clue } from './entities/clue.entity';

import { CluesPaginationDTO } from './dtos/paginated-clues.dto';
import { CreateCLueDto } from './dtos/create-clue.dto';
import { UpdateCLueDto } from './dtos/update-clue.dto';

import { Type } from './enums/type.enum';
import { Status } from './enums/status.enum';

@Injectable()
export class CluesService {
  constructor(
    @InjectRepository(Clue)
    private readonly cluesRepository: Repository<Clue>,
  ) {}

  /**
   * Find clues with offset
   */
  async findAll(dto: CluesPaginationDTO): Promise<PaginatedDTO<Clue>> {
    // const results = await this.cluesRepository
    //   .createQueryBuilder()
    //   .skip(dto.offset)
    //   .take(dto.pageSize)
    //   .execute();
    // if (isEmpty('')) {
    //   throw BizException.create(
    //     ERR_REQ_FIELD_ERROR,
    //     'User id should not be empty!',
    //   );
    // }
    const [results, total] = await this.cluesRepository.findAndCount({
      skip: dto.offset,
      take: parseInt(dto.pageSize, 10),
    });

    const paginatedResult = new PaginatedDTO<Clue>();
    paginatedResult.total = total;
    paginatedResult.pageNum = dto.pageNum;
    paginatedResult.pageSize = dto.pageSize;
    paginatedResult.rows = results;

    return paginatedResult;
  }

  /**
   * Add new clue
   */
  create(dto: CreateCLueDto): Promise<Clue> {
    return this.cluesRepository.save(dto);
  }

  update(id: string, dto: UpdateCLueDto) {
    if (isEmpty(id)) {
      throw BizException.create(
        ERR_REQ_FIELD_ERROR,
        'User id should not be empty!',
      );
    }
    return this.cluesRepository
      .createQueryBuilder()
      .update()
      .set(dto)
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Del a clue by id
   */
  async delete(id: string) {
    // const clueInfo = await this.cluesRepository.findOneBy({
    //   id,
    // });
    // TODO：已升级为事件的线索不能删除
    // if (clueInfo) {
    //   if(clueInfo.status !== '')
    // }
    return this.cluesRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  /**
   * Count clues by dynamic field
   */
  async countItems(by: string) {
    const results = await this.cluesRepository
      .createQueryBuilder('item')
      .select(`item.${by}`, by) //统计字段名称
      .addSelect(`COUNT(item.${by})`, 'count') //统计数字段
      .groupBy(`item.${by}`) //根据xx进行统计
      .getRawMany();

    return results.reduce((accumulator, result) => {
      const typeName = Type[result.type];
      accumulator[typeName] = parseInt(result.count, 10);
      return accumulator;
    }, {});
  }

  /**
   * Find a clue by id
   */
  findOne(id: string) {
    return this.cluesRepository.findOneBy({ id });
  }

  /**
   * Upgrade a clue by id
   */
  async upgrade(id: string) {
    const clueInfo = await this.findOne(id);
    if (clueInfo) {
      if ([Status.未受理, Status.观察].includes(clueInfo.status)) {
        return await this.update(id, { status: Status.升级为事件 });
        // TODO: 新增一条记录到events table
      }
    }
    return {};
  }

  /**
   * Ignore a clue by id
   */
  async ignore(id: string) {
    const clueInfo = await this.findOne(id);
    if (clueInfo) {
      if ([Status.未受理].includes(clueInfo.status)) {
        return await this.update(id, { status: Status.忽略 });
      }
    }
    return {};
  }
}
