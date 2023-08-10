import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { CLueDto } from './clue.dto';

// OmitType-排除属性
// PickType-选取部分属性
// PartialType-属性变为可选
export class UpdateCLueDto extends PartialType(CLueDto) {}
