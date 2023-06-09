import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserEntityPayload } from './types/create-user-entity-payload';
import { Nullable } from '../../common/type/common-types';
import { compare, genSalt, hash } from 'bcryptjs';
import { EditUserEntityPayload } from './types/edit-user-entity-payload';
import { v4 } from 'uuid';
import { Entity } from '../../common/entity/Entity';

export class User extends Entity<string> {
  @IsString()
  private name: string;

  @IsEmail()
  private readonly email: string;

  @IsString()
  private password: string;

  @IsDate()
  private readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  private editedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  constructor(payload: CreateUserEntityPayload) {
    super();
    this.name = payload.name;
    this.email = payload.email;

    this.id = payload.id || v4();
    this.createdAt = payload.createdAt || new Date();
    this.editedAt = payload.editedAt || null;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getEditedAt(): Nullable<Date> {
    return this.editedAt;
  }

  public getRemovedAt(): Nullable<Date> {
    return this.removedAt;
  }

  public async hashPassword(): Promise<void> {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);

    await this.validate();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public async edit(payload: EditUserEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    if (payload.name) {
      this.name = payload.name;
      this.editedAt = currentDate;
    }
    if (payload.name) {
      this.name = payload.name;
      this.editedAt = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }

  public static async new(payload: CreateUserEntityPayload): Promise<User> {
    const user: User = new User(payload);
    await user.hashPassword();
    await user.validate();

    return user;
  }
}
