import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { CLueDto } from './clue.dto';

export class CreateCLueDto extends CLueDto {}
