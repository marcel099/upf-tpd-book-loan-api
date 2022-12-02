import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray } from 'class-validator';

export class UpdateBookAuthorsIdsDto {
  @IsArray()
  @Type(() => String)
  @ArrayMinSize(1)
  @ApiProperty()
  authorsIds: string[];
}
