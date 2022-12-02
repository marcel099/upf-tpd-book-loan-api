import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  number_edition: number;

  @IsArray()
  @Type(() => String)
  @ArrayMinSize(1)
  @ApiProperty()
  authorsIds: string[];

  @IsArray()
  @Type(() => String)
  @ArrayMinSize(1)
  @ApiProperty()
  gendersIds: string[];
}
