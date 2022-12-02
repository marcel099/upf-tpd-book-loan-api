import { ApiProperty } from '@nestjs/swagger';

export class RenewalEntity {
  @ApiProperty()
  renewal_date: string;

  @ApiProperty()
  return_date: string | null;

  @ApiProperty()
  fine_payment_date: string;

  @ApiProperty()
  fine_value: number;
}
