import { UserRepositoryPort } from 'src/v1/users/core/domain/ports/persistence/UserRepositoryPort';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from 'src/v1/users/core/domain/entities/user';
import { TypeOrmUserMapper } from '../entity/mappers/type-orm-user-mapper';
import { TypeOrmUser } from '../entity/type-orm-user';
import { RepositoryFindOptions } from 'src/v1/users/core/common/persistence/RepositoryOptions';
import { Optional } from 'src/v1/users/core/common/type/common-types';

@Injectable()
export class TypeOrmUserRepositoryAdapter implements UserRepositoryPort {
  private readonly userAlias: string = 'user';
  private readonly excludeRemovedUserClause: string = `"${this.userAlias}"."removedAt" IS NULL`;

  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}

  public async findUser(
    by: { id?: string; email?: string },
    options: RepositoryFindOptions = {},
  ): Promise<Optional<User>> {
    let domainEntity: Optional<User>;

    const query = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    if (!options.includeRemoved) {
      query.andWhere(this.excludeRemovedUserClause);
    }

    const ormEntity = await query.getOne();

    if (ormEntity) {
      domainEntity = TypeOrmUserMapper.toDomainEntity(ormEntity);
    }

    return domainEntity;
  }

  public async countUsers(
    by: { id?: string; email?: string },
    options: RepositoryFindOptions = {},
  ): Promise<number> {
    const query = this.buildUserQueryBuilder();

    this.extendQueryWithByProperties(by, query);

    if (!options.includeRemoved) {
      query.andWhere(this.excludeRemovedUserClause);
    }

    return query.getCount();
  }

  public async addUser(user: User): Promise<{ id: string }> {
    const ormUser = TypeOrmUserMapper.toOrmEntity(user);

    const insertResult = await this.userRepository
      .createQueryBuilder(this.userAlias)
      .insert()
      .into(TypeOrmUser)
      .values([ormUser])
      .execute();

    return {
      id: insertResult.identifiers[0].id,
    };
  }

  public async updateUser(user: User): Promise<void> {
    const ormUser = TypeOrmUserMapper.toOrmEntity(user);
    await this.userRepository.update(ormUser.id, ormUser);
  }

  private buildUserQueryBuilder(): SelectQueryBuilder<TypeOrmUser> {
    return this.userRepository.createQueryBuilder(this.userAlias).select();
  }

  private extendQueryWithByProperties(
    by: { id?: string; email?: string },
    query: SelectQueryBuilder<TypeOrmUser>,
  ): void {
    if (by.id) {
      query.andWhere(`"${this.userAlias}"."id" = :id`, { id: by.id });
    }
    if (by.email) {
      query.andWhere(`"${this.userAlias}"."email" = :email`, {
        email: by.email,
      });
    }
  }
}
