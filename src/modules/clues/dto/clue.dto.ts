import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsInt, Min } from 'class-validator';

import { Status } from '../enums/status.enum';
import { Level } from '../enums/level.enum';

export class CLueDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty({
    enum: Level,
    description: '等级',
    example: Level.一般,
  })
  @IsNumber()
  level: number;

  @ApiProperty({
    enum: Status,
    description: '状态',
    example: Status.未受理,
  })
  @IsNumber()
  status: number;

  @ApiProperty({
    description: '发生时间',
  })
  occTime: Date;
}
