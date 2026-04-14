import { Either, left, right } from '@/core/either';
import { DeliveryRepository } from '../repositories/delivery-repository';
import { DeliveryNotFoundError } from './errors/delivery-not-found-error';
import { DeliveryStatus } from '../../enterprise/entities/delivery';
import { UpdateStatusDeliveryError } from './errors/update-status-delivery-error';
import { Injectable } from '@nestjs/common';
import { Delivery } from '../../enterprise/entities/delivery';

type UpdateDeliveryStatusUseCaseResponse = Either<
  DeliveryNotFoundError | UpdateStatusDeliveryError,
  { delivery: Delivery }
>;

@Injectable()
export class UpdateDeliveryStatusUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async markAsAvailable(
    deliveryId: string,
  ): Promise<UpdateDeliveryStatusUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new DeliveryNotFoundError(deliveryId));
    }

    if (delivery.status !== DeliveryStatus.CREATED) {
      return left(new UpdateStatusDeliveryError(delivery.status));
    }

    delivery.update({ status: DeliveryStatus.PENDING });
    await this.deliveryRepository.update(delivery);

    return right({ delivery });
  }

  async markAsWithdrawn(
    deliveryId: string,
  ): Promise<UpdateDeliveryStatusUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      return left(new DeliveryNotFoundError(deliveryId));
    }
    if (delivery.status !== DeliveryStatus.PENDING) {
      return left(new UpdateStatusDeliveryError(delivery.status));
    }
    delivery.update({ status: DeliveryStatus.WITHDRAWN });
    await this.deliveryRepository.update(delivery);
    return right({ delivery });
  }

  async markAsDelivered(
    deliveryId: string,
    photoUrl: string,
  ): Promise<UpdateDeliveryStatusUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!photoUrl) {
      return left(
        new UpdateStatusDeliveryError(
          'É necessário informar a foto da entrega.',
        ),
      );
    }
    if (!delivery) {
      return left(new DeliveryNotFoundError(deliveryId));
    }
    if (delivery.status !== DeliveryStatus.WITHDRAWN) {
      return left(new UpdateStatusDeliveryError(delivery.status));
    }
    delivery.update({ status: DeliveryStatus.DELIVERED, photoUrl });
    await this.deliveryRepository.update(delivery);
    return right({ delivery });
  }

  async markAsReturned(
    deliveryId: string,
  ): Promise<UpdateDeliveryStatusUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      return left(new DeliveryNotFoundError(deliveryId));
    }
    if (delivery.status !== DeliveryStatus.WITHDRAWN) {
      return left(new UpdateStatusDeliveryError(delivery.status));
    }
    delivery.update({ status: DeliveryStatus.RETURNED });
    await this.deliveryRepository.update(delivery);
    return right({ delivery });
  }
}
