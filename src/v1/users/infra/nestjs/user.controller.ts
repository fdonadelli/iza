import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '../../core/domain/usecase/CreateUserUseCase';
//import { GetUserUseCase } from '../../core/domain/usecase/GetUserUseCase';
import { UserUseCaseDto } from '../../core/domain/usecase/dto/UserUseCaseDto';
import { CreateUserAdapter } from '../adapter/usecase/create-user.adapter';
import { HttpRestApiModelCreateUserBody } from '../../application/api/controller/documentation/http-rest-api-model-create-user-body';
import { CoreApiResponse } from '../../core/common/api/CoreApiResponse';
import { HttpRestApiResponseUser } from '../../application/api/controller/documentation/http-rest-api-response-user';
import { UserDITokens } from '../../core/di/UserDITokens';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    @Inject(UserDITokens.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase, //private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post('account')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: HttpRestApiModelCreateUserBody })
  @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  public async createAccount(
    @Body() body: HttpRestApiModelCreateUserBody,
  ): Promise<CoreApiResponse<UserUseCaseDto>> {
    const adapter: CreateUserAdapter = await CreateUserAdapter.new({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const createdUser: UserUseCaseDto = await this.createUserUseCase.execute(
      adapter,
    );

    return CoreApiResponse.success(createdUser);
  }

  // @Get('me')
  // @HttpCode(HttpStatus.OK)
  // @ApiBearerAuth()
  // @HttpAuth(UserRole.AUTHOR, UserRole.ADMIN, UserRole.GUEST)
  // @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponseUser })
  // public async getMe(
  //   @HttpUser() httpUser: HttpUserPayload,
  // ): Promise<CoreApiResponse<UserUseCaseDto>> {
  //   const adapter: GetUserAdapter = await GetUserAdapter.new({
  //     userId: httpUser.id,
  //   });
  //   const user: UserUseCaseDto = await this.getUserUseCase.execute(adapter);

  //   return CoreApiResponse.success(user);
  // }
}
