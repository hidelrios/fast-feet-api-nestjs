import { Either, left, right } from '@/core/either';
import { DeliveryRepository } from '../repositories/delivery-repository';
import { DeliveryNotFoundError } from './errors/delivery-not-found-error';
import { DeliveryStatus } from '../../enterprise/entities/delivery';
import { UpdateStatusDeliveryError } from './errors/update-status-delivery-error';
import { DeliveryNotAssignedToDeliverymanError } from './errors/delivery-not-assigned-to-deliveryman-error';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { publishStatusEvent } from '@/core/helpers/publish-status-event';
import { Delivery } from '../../enterprise/entities/delivery';

type UpdateDeliveryStatusUseCaseResponse = Either<
  DeliveryNotFoundError | UpdateStatusDeliveryError | DeliveryNotAssignedToDeliverymanError,
  { delivery: Delivery }
>;

@Injectable()
export class UpdateDeliveryStatusUseCase {
  constructor(
    private deliveryRepository: DeliveryRepository,
    private readonly eventBus: EventBus,
  ) {}

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
    publishStatusEvent(this.eventBus, delivery);

    return right({ delivery });
  }

  async markAsWithdrawn(
    deliveryId: string,
    deliverymanId: string,
  ): Promise<UpdateDeliveryStatusUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      return left(new DeliveryNotFoundError(deliveryId));
    }
    if (delivery.deliverymanId !== deliverymanId) {
      return left(new DeliveryNotAssignedToDeliverymanError(deliverymanId));
    }
    if (delivery.status !== DeliveryStatus.PENDING) {
      return left(new UpdateStatusDeliveryError(delivery.status));
    }
    delivery.update({ status: DeliveryStatus.WITHDRAWN });
    await this.deliveryRepository.update(delivery);
    publishStatusEvent(this.eventBus, delivery);
    return right({ delivery });
  }

  async markAsDelivered(
    deliveryId: string,
    photoUrl: string,
    deliverymanId: string,
  ): Promise<UpdateDeliveryStatusUseCaseResponse> {
    if (!photoUrl) {
      return left(
        new UpdateStatusDeliveryError(
          'É necessário informar a foto da entrega.',
        ),
      );
    }
    const delivery = await this.deliveryRepository.findById(deliveryId);

    if (!delivery) {
      return left(new DeliveryNotFoundError(deliveryId));
    }
    if (delivery.status !== DeliveryStatus.WITHDRAWN) {
      return left(new UpdateStatusDeliveryError(delivery.status));
    }
    if (delivery.deliverymanId !== deliverymanId) {
      return left(new DeliveryNotAssignedToDeliverymanError(deliverymanId));
    }
    delivery.update({ status: DeliveryStatus.DELIVERED, photoUrl });
    await this.deliveryRepository.update(delivery);
    publishStatusEvent(this.eventBus, delivery);
    return right({ delivery });
  }

  async markAsReturned(
    deliveryId: string,
    deliverymanId: string,
  ): Promise<UpdateDeliveryStatusUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      return left(new DeliveryNotFoundError(deliveryId));
    }
    if (delivery.deliverymanId !== deliverymanId) {
      return left(new DeliveryNotAssignedToDeliverymanError(deliverymanId));
    }
    if (delivery.status !== DeliveryStatus.WITHDRAWN) {
      return left(new UpdateStatusDeliveryError(delivery.status));
    }
    delivery.update({ status: DeliveryStatus.RETURNED });
    await this.deliveryRepository.update(delivery);
    publishStatusEvent(this.eventBus, delivery);
    return right({ delivery });
  }
}
