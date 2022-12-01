import { ApiProperty } from '@nestjs/swagger';

export class StudentEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  registration_number: number;
}
