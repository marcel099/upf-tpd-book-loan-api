import { ApiProperty } from '@nestjs/swagger';

export class RenewalEntity {
  @ApiProperty()
  renewal_date: string;

  @ApiProperty()
  return_date: string;
}
