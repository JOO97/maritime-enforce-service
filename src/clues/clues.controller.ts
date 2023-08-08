/**
 * controller: 路由
 */
import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpCode,
  Delete,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CluesService } from './clues.service';
import { CluesPaginationDTO } from './dto/clues-pagination.dto';

@Controller('clues')
export class CluesController {
  constructor(private readonly cluesService: CluesService) {}

  @Get()
  @ApiOperation({ summary: '分页查询线索' })
  findAll(@Query() dto: CluesPaginationDTO) {
    return this.cluesService.findAll(dto);
  }
}
