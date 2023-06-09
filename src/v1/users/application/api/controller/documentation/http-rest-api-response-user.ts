import { ApiProperty } from '@nestjs/swagger';
import { HttpRestApiResponse } from './common/HttpRestApiResponse';
import { HttpRestApiModelUser } from './http-rest-api-model-user';

export class HttpRestApiResponseUser extends HttpRestApiResponse {
  @ApiProperty({ type: HttpRestApiModelUser })
  public data: HttpRestApiModelUser;
}
