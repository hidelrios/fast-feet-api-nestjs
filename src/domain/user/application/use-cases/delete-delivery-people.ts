import { DeliveryPeopleRepository } from '../repositories/delivery-people-repository';
import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { DeliveryPeopleNotExistsError } from './erros/delivery-people-not-exists-error';

interface DeleteDeliveryPeopleUseCaseRequest {
  id: string;
}

type DeleteDeliveryPeopleUseCaseResponse = Either<
  DeliveryPeopleNotExistsError,
  void
>;
@Injectable()
export class DeleteDeliveryPeopleUseCase {
  constructor(
    private deliveryPeopleRepository: DeliveryPeopleRepository,
  ) {}

  async execute({
    id,
  }: DeleteDeliveryPeopleUseCaseRequest): Promise<DeleteDeliveryPeopleUseCaseResponse> {
    const userExists = await this.deliveryPeopleRepository.findById(id);

    if (!userExists) {
      return left(new DeliveryPeopleNotExistsError(id));
    }
    await this.deliveryPeopleRepository.delete(id);
    return right(undefined);
  }
}
