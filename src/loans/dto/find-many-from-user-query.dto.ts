import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class FindManyFromUserQuery {
  @IsString()
  @IsMongoId()
  @ApiProperty()
  student_id: string;
}
