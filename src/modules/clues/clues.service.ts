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

import { Type } from './enums/type.enum';
import { Status } from './enums/status.enum';

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

  findOne(id: string) {
    return this.cluesRepository.findOneBy({ id });
  }

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
