import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelCreateUserBody {
  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public email: string;

  @ApiProperty({ type: 'string' })
  public password: string;
}
