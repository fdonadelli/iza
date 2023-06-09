import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class TypeOrmUser {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public createdAt: Date;

  @Column()
  public editedAt: Date;

  @Column()
  public removedAt: Date;
}
