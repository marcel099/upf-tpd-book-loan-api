import { ApiProperty } from '@nestjs/swagger';

export class BookEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  booksIds: string[];

  @ApiProperty()
  year: number;

  @ApiProperty()
  number_edition: number;

  @ApiProperty()
  authorsIds: string[];

  @ApiProperty()
  gendersIds: string[];
}
