import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class PrimaryFieldsDto {
  @IsString()
  @IsMongoId()
  @ApiProperty()
  student_id: string;

  @IsString()
  @IsMongoId()
  @ApiProperty()
  book_id: string;
}
