import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDTO<T> {
  @ApiProperty()
  pageSize: string;

  @ApiProperty()
  pageNum: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  rows: T[];
}
