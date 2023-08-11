import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class CluesPaginationDTO {
  @ApiProperty({
    default: 1,
  })
  @IsNumberString()
  readonly pageNum: string = '1';

  @ApiProperty({
    default: 10,
  })
  @IsNumberString()
  readonly pageSize: string = '10';

  get offset(): number {
    return (parseInt(this.pageNum, 10) - 1) * parseInt(this.pageSize, 10);
  }
}
