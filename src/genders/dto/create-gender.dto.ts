import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
