import { Either, left, right } from '@/core/either';
import { Delivery } from '../../enterprise/entities/delivery';
import { DeliveryRepository } from '../repositories/delivery-repository';
import { DeliveryNotFoundError } from './errors/delivery-not-found-error';
import { Inject, Injectable } from '@nestjs/common';

interface DeleteDeliveryRequest {
  id: string;
}

type DeleteDeliveryResponse = Either<DeliveryNotFoundError, void>;

@Injectable()
export class DeleteDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    id,
  }: DeleteDeliveryRequest): Promise<DeleteDeliveryResponse> {
    const deliveryAlreadyExists = await this.deliveryRepository.findById(id);

    if (!deliveryAlreadyExists) {
      return left(new DeliveryNotFoundError(id));
    }

    await this.deliveryRepository.delete(id);

    return right(undefined);
  }
}
