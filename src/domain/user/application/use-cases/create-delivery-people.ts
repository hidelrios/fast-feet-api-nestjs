import { Role } from '@prisma/client';
import { User } from '../../enterprise/entities/user';
import { DeliveryPeopleRepository } from '../repositories/delivery-people-repository';
import { DeliveryPeopleAlreadyExistsError } from './erros/delivery-people-already-exists-error';
import { Either, left, right } from '@/core/either';
import { HashGenerator } from '../cryptography/hash-generator';

interface CreateDeliveryPeopleUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type CreateDeliveryPeopleUseCaseResponse = Either<
  DeliveryPeopleAlreadyExistsError,
  {
    deliveryPerson: User;
  }
>;
export class CreateDeliveryPeopleUseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: CreateDeliveryPeopleUseCaseRequest): Promise<CreateDeliveryPeopleUseCaseResponse> {
    const userAlreadyExists =
      await this.deliveryPeopleRepository.findByCpf(cpf);

    if (userAlreadyExists) {
      return left(new DeliveryPeopleAlreadyExistsError(cpf));
    }

    const passwordHash = await this.hashGenerator.hash(password);
    const deliveryPerson = User.create({
      name,
      cpf,
      password: passwordHash,
      role: Role.DELIVERYMAN,
    });

    await this.deliveryPeopleRepository.create(deliveryPerson);

    return right({ deliveryPerson });
  }
}
