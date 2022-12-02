import { ApiProperty } from '@nestjs/swagger';

export class AuthorEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  booksIds: string[];
}
