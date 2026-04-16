import { Either, left, right } from '@/core/either';
import { Delivery, DeliveryStatus } from '../../enterprise/entities/delivery';
import { DeliveryRepository } from '../repositories/delivery-repository';
import { CreateDeliveryError } from './errors/create-delivery-error';
import { DeliveryPeopleRepository } from '@/domain/user/application/repositories/delivery-people-repository';
import { DeliveryManNotFoundError } from './errors/deliveryman-not-found-error';
import { RecipientRepository } from '../repositories/recipient-repository';
import { RecipientNotFoundError } from './errors/recipient-not-found-error';
import { Injectable } from '@nestjs/common';

interface CreateDeliveryRequest {
  recipientId: string;
}

type CreateDeliveryResponse = Either<
  CreateDeliveryError | DeliveryManNotFoundError | RecipientNotFoundError,
  { delivery: Delivery }
>;

@Injectable()
export class CreateDeliveryUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private recipientRepository: RecipientRepository,
  ) {}

  async execute({
    recipientId,
  }: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new RecipientNotFoundError(recipientId));
    }

    try {
      const delivery = Delivery.create({
        recipientId: recipientId,
        status: DeliveryStatus.CREATED,
      });

      await this.deliveryRepository.create(delivery);

      return right({ delivery });
    } catch (err) {
      return left(new CreateDeliveryError());
    }
  }
}
