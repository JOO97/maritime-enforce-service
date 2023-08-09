import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class CluesPaginationDTO {
  @ApiProperty()
  @IsNumberString()
  readonly pageNum: number = 1;

  @ApiProperty()
  @IsNumberString()
  readonly pageSize: number = 10;

  get offset(): number {
    return (this.pageNum - 1) * this.pageSize;
  }
}
