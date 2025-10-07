import { User } from '../../enterprise/entities/user';
import { DeliveryPeopleRepository } from '../repositories/delivery-people-repository';
import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { DeliveryPeopleNotExistsError } from './erros/delivery-people-not-exists-error';

interface ReadDeliveryPeopleUseCaseRequest {
  id?: string;
  cpf?: string;
}

type ReadDeliveryPeopleUseCaseResponse = Either<
  DeliveryPeopleNotExistsError,
  User | User[] | null
>;
@Injectable()
export class ReadDeliveryPeopleUseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
  ) {}

  async execute({
    id,
    cpf
  }: ReadDeliveryPeopleUseCaseRequest): Promise<ReadDeliveryPeopleUseCaseResponse> {
    if (!id && !cpf) {
      const allUsers = await this.deliveryPeopleRepository.findAll();
      return right(allUsers);
    }

    if (id) {
      const user = await this.deliveryPeopleRepository.findById(id);
      if (!user) return left(new DeliveryPeopleNotExistsError(id));
      return right(user);
    }

    if (cpf) {
      const user = await this.deliveryPeopleRepository.findByCpf(cpf);
      if (!user) return left(new DeliveryPeopleNotExistsError(cpf));
      return right(user);
    }

    return left(new DeliveryPeopleNotExistsError(id || cpf || 'unknown'));
  }
}

