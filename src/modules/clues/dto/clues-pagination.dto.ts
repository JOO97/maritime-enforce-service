import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class CluesPaginationDTO {
  @ApiProperty({
    default: 1,
  })
  @IsNumberString()
  readonly pageNum: number = 1;

  @ApiProperty({
    default: 10,
  })
  @IsNumberString()
  readonly pageSize: number = 10;

  get offset(): number {
    return (this.pageNum - 1) * this.pageSize;
  }
}
