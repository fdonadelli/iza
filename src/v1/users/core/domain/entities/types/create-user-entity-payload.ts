export type CreateUserEntityPayload = {
  name: string;
  email: string;
  password: string;
  id?: string;
  createdAt?: Date;
  editedAt?: Date;
};
