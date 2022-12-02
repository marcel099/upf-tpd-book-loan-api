import { ApiProperty } from '@nestjs/swagger';

export class GenderEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  booksIds: string[];
}
