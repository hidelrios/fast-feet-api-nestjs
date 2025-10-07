import { User } from '../../enterprise/entities/user';
import { DeliveryPeopleRepository } from '../repositories/delivery-people-repository';
import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { DeliveryPeopleNotExistsError } from './erros/delivery-people-not-exists-error';

interface UpdateDeliveryPeopleUseCaseRequest {
  id: string;
  name?: string;
  cpf?: string;
}

type UpdateDeliveryPeopleUseCaseResponse = Either<
  DeliveryPeopleNotExistsError,
  {
    deliveryPerson: User;
  }
>;
@Injectable()
export class UpdateDeliveryPeopleUseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
  ) {}

  async execute({
    id,
    name,
    cpf,
  }: UpdateDeliveryPeopleUseCaseRequest): Promise<UpdateDeliveryPeopleUseCaseResponse> {
    const userAlreadyExists = await this.deliveryPeopleRepository.findById(id);

    if (!userAlreadyExists) {
      return left(new DeliveryPeopleNotExistsError(id));
    }

    userAlreadyExists.update({ name, cpf });

    await this.deliveryPeopleRepository.update(userAlreadyExists);

    return right({ deliveryPerson: userAlreadyExists });
  }
}
