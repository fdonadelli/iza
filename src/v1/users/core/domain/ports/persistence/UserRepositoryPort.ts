import { RepositoryFindOptions } from '../../../common/persistence/RepositoryOptions';
import { Optional } from '../../../common/type/common-types';
import { User } from '../../entities/user';

export interface UserRepositoryPort {
  findUser(
    by: { id?: string; email?: string },
    options?: RepositoryFindOptions,
  ): Promise<Optional<User>>;

  countUsers(
    by: { id?: string; email?: string },
    options?: RepositoryFindOptions,
  ): Promise<number>;

  addUser(user: User): Promise<{ id: string }>;

  updateUser(user: User): Promise<void>;
}
