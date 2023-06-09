import { User } from 'src/v1/users/core/domain/entities/user';
import { TypeOrmUser } from '../type-orm-user';

export class TypeOrmUserMapper {
  public static toOrmEntity(domainUser: User): TypeOrmUser {
    const ormUser: TypeOrmUser = new TypeOrmUser();

    ormUser.id = domainUser.getId();
    ormUser.name = domainUser.getName();
    ormUser.email = domainUser.getEmail();
    ormUser.password = domainUser.getPassword();

    ormUser.createdAt = domainUser.getCreatedAt();
    ormUser.editedAt = domainUser.getEditedAt() as Date;
    ormUser.removedAt = domainUser.getRemovedAt() as Date;

    return ormUser;
  }

  public static toOrmEntities(domainUsers: User[]): TypeOrmUser[] {
    return domainUsers.map((domainUser) => this.toOrmEntity(domainUser));
  }

  public static toDomainEntity(ormUser: TypeOrmUser): User {
    const domainUser: User = new User({
      name: ormUser.name,
      email: ormUser.email,
      password: ormUser.password,
      id: ormUser.id,
      createdAt: ormUser.createdAt,
      editedAt: ormUser.editedAt,
    });

    return domainUser;
  }

  public static toDomainEntities(ormUsers: TypeOrmUser[]): User[] {
    return ormUsers.map((ormUser) => this.toDomainEntity(ormUser));
  }
}
