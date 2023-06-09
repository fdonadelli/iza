import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { UseCaseValidatableAdapter } from 'src/v1/users/core/common/adapter/usecase/usecase-validatable.adapter';
import { CreateUserPort } from 'src/v1/users/core/domain/ports/usecase/CreateUserPort';

@Exclude()
export class CreateUserAdapter
  extends UseCaseValidatableAdapter
  implements CreateUserPort
{
  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsEmail()
  public email: string;

  @Expose()
  @IsString()
  public password: string;

  public static async new(payload: CreateUserPort): Promise<CreateUserAdapter> {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
