import { CreateUserUseCase } from 'src/v1/users/core/domain/usecase/CreateUserUseCase';
import { Code } from '../../../core/common/code/code';
import { Exception } from '../../../core/common/exception/Exception';
import { CoreAssert } from '../../../core/common/util/assert/CoreAssert';
import { User } from '../../../core/domain/entities/user';
import { UserRepositoryPort } from '../../../core/domain/ports/persistence/UserRepositoryPort';
import { CreateUserPort } from '../../../core/domain/ports/usecase/CreateUserPort';
import { UserUseCaseDto } from '../../../core/domain/usecase/dto/UserUseCaseDto';

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(payload: CreateUserPort): Promise<UserUseCaseDto> {
    const doesUserExist = !!(await this.userRepository.countUsers({
      email: payload.email,
    }));
    CoreAssert.isFalse(
      doesUserExist,
      Exception.new({
        code: Code.ENTITY_ALREADY_EXISTS_ERROR,
        overrideMessage: 'User already exists.',
      }),
    );

    const user: User = await User.new({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    });

    await this.userRepository.addUser(user);

    return UserUseCaseDto.newFromUser(user);
  }
}
