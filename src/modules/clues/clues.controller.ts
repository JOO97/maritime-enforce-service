/**
 * controller: 路由
 */
import {
  Controller,
  Get,
  Patch,
  Query,
  HttpStatus,
  HttpCode,
  Delete,
  Param,
  Post,
  Body,
  Header,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

// import { Response } from 'express';
import { ApiResponseDTO } from '../../common/dtos/api-response.dto';
import { PaginatedDTO } from '../../common/dtos/paginated.dto';

import { CluesService } from './clues.service';
import { CluesPaginationDTO } from './dtos/paginated-clues.dto';
import { CLueDto } from './dtos/clue.dto';
import { CreateCLueDto } from './dtos/create-clue.dto';
import { UpdateCLueDto } from './dtos/update-clue.dto';

import { Clue } from './entities/clue.entity';

@ApiTags('Clue Module')
@Controller('clues')
export class CluesController {
  constructor(private readonly cluesService: CluesService) {}

  @Get()
  @HttpCode(HttpStatus.OK) //默认是200
  @Header('Cache-Control', 'none')
  @ApiOperation({ summary: 'Paginated search' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully queried organization information',
    type: ApiResponseDTO<PaginatedDTO<CLueDto>>,
  })
  async findAll(
    @Query() dto: CluesPaginationDTO,
  ): Promise<PaginatedDTO<CLueDto>> {
    return await this.cluesService.findAll(dto);
  }

  @Post()
  @ApiOperation({ summary: 'Add a new clue' })
  async create(@Body() dto: CreateCLueDto) {
    return await this.cluesService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'modify a clue by id' })
  async update(@Param('id') id: string, @Body() dto: UpdateCLueDto) {
    return await this.cluesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a clue by id' })
  async delete(@Param('id') id: string) {
    return await this.cluesService.delete(id);
  }

  @Get('/countByType')
  @ApiOperation({ summary: 'count clues by type field' })
  async countItemsByType() {
    return await this.cluesService.countItems('type');
  }

  @Post(':id/upgrade')
  @ApiOperation({ summary: 'upgrade a clue by id' })
  async upgrade(@Param('id') id: string) {
    return await this.cluesService.upgrade(id);
  }

  @Post(':id/ignore')
  @ApiOperation({ summary: 'ignore a clue by id' })
  async ignore(@Param('id') id: string) {
    return await this.cluesService.ignore(id);
  }
}
