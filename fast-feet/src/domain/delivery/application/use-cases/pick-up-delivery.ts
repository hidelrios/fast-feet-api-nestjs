import { Injectable } from "@nestjs/common";
import { DeliveryStatus } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { Either, left, right } from "@/core/either";
import { DeliveryNotFoundError } from "./errors/delivery-not-found-error";
import { PickUpDeliveryError } from "./errors/delivery-pick-up-error";
import { EventBus } from "@nestjs/cqrs";
import { publishStatusEvent } from "@/core/helpers/publish-status-event";

type PickUpDeliveryUseCaseResponse = Either<
  DeliveryNotFoundError,
  void
>;
@Injectable()
export class PickUpDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(deliveryId: string, deliverymanId: string): Promise<PickUpDeliveryUseCaseResponse> {
    const delivery = await this.deliveryRepository.findById(deliveryId);
    if (!delivery) {
      return left(new DeliveryNotFoundError(deliveryId));
    }
    if (delivery.status !== DeliveryStatus.PENDING) {
      return left(new PickUpDeliveryError(`Delivery with ID ${deliveryId} is not pending`));
    }

    try{
      delivery.update({ status: DeliveryStatus.WITHDRAWN, deliverymanId });
      await this.deliveryRepository.update(delivery);
      publishStatusEvent(this.eventBus, delivery);
      return right(undefined);
    }catch (err) {
      return left(new PickUpDeliveryError(`Failed to pick up delivery with ID ${deliveryId}: ${err.message}`));
    }
  }


}