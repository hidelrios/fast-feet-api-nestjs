import { right, left, Either } from "@/core/either";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { Inject, Injectable } from "@nestjs/common";
import { Delivery } from "../../enterprise/entities/delivery";
import { GetDeliveryByDeliverymanError } from "./errors/get-delivery-by-deliveryman-error";

type GetDeliveryByDeliverymanUseCaseResponse = Either<Error, { deliveries: Delivery[] }>;

@Injectable()
export class GetDeliveryByDeliverymanUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) { }

  async execute(deliverymanId: string): Promise<GetDeliveryByDeliverymanUseCaseResponse> {
    try {
      const deliveries = await this.deliveryRepository.findByDeliverymanId(deliverymanId);
      return right({ deliveries });
    } catch (error) {
      return left(new GetDeliveryByDeliverymanError());
    }
  }
}
