import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelUser {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public email: string;
}
