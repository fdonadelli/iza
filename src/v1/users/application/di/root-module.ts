import { Module } from '@nestjs/common';
import { UserModule } from './user-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../../infra/config/DatabaseConfig';
import { TypeOrmUser } from '../../infra/persistence/typeorm/entity/type-orm-user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'iza_challange',
      logging: DatabaseConfig.DB_LOG_ENABLE ? 'all' : false,
      synchronize: true,
      entities: [TypeOrmUser],
    }),
    UserModule,
  ],
})
export class RootModule {}
