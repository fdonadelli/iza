import { UseCase } from '../../common/usecase/UseCase';
import { CreateUserPort } from '../ports/usecase/CreateUserPort';
import { UserUseCaseDto } from './dto/UserUseCaseDto';

export type CreateUserUseCase = UseCase<CreateUserPort, UserUseCaseDto>;
