import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDTO<T> {
  @ApiProperty()
  code: number;

  @ApiProperty()
  msg: string;

  @ApiProperty()
  data: T;
}
