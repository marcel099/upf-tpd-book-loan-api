import { ApiProperty } from '@nestjs/swagger';

import { RenewalEntity } from './renewal.entity';

export class LoanEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  withdrawal_date: string;

  @ApiProperty()
  return_date: string;

  @ApiProperty()
  renewals_amount: number;

  @ApiProperty()
  bookId: string;

  @ApiProperty()
  studentId: string;

  @ApiProperty({ type: () => [RenewalEntity] })
  renewals: RenewalEntity[];
}
