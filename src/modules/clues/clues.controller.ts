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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CluesService } from './clues.service';
import { CluesPaginationDTO } from './dto/clues-pagination.dto';
import { CreateCLueDto } from './dto/create-clue.dto';
import { UpdateCLueDto } from './dto/update-clue.dto';

@ApiTags('Clue Module')
@Controller('clues')
export class CluesController {
  constructor(private readonly cluesService: CluesService) {}

  @Get()
  @ApiOperation({ summary: 'Paginated search' })
  async findAll(@Query() dto: CluesPaginationDTO) {
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
  @ApiOperation({ summary: 'upgrade a clue by id' })
  async ignore(@Param('id') id: string) {
    return await this.cluesService.ignore(id);
  }
}
