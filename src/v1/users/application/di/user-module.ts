import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserService } from '../services/create-user/create-user.service';
import { UserController } from '../../infra/nestjs/user.controller';
import { TypeOrmUserRepositoryAdapter } from '../../infra/persistence/typeorm/repository/type-orm-user-.repository.adapter';
import { UserDITokens } from '../../core/di/UserDITokens';
import { TypeOrmUser } from '../../infra/persistence/typeorm/entity/type-orm-user';

const useCaseProviders: Provider[] = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository) => new CreateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
];

const repositoryProviders: Provider[] = [
  {
    provide: UserDITokens.UserRepository,
    useClass: TypeOrmUserRepositoryAdapter,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  controllers: [UserController],
  providers: [...useCaseProviders, ...repositoryProviders],
  exports: [TypeOrmModule],
})
export class UserModule {}
