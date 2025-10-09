import { Either, left, right } from "@/core/either";
import { Delivery } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { DeliveryNotFoundError } from "./errors/delivery-not-found-error";

interface ReadDeliveryRequest {
  id?: string;
}

type ReadDeliveryResponse = Either<DeliveryNotFoundError, { delivery: Delivery[] }>;

export class ReadDeliveryUseCase {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  async execute({ id }: ReadDeliveryRequest): Promise<ReadDeliveryResponse> {
    if (id) {
      const delivery = await this.deliveryRepository.findById(id);

      if (!delivery) {
        return left(new DeliveryNotFoundError(id));
      }

      return right({ delivery: [delivery] });
    }

    const allDeliveries = await this.deliveryRepository.findAll();
    return right({ delivery: allDeliveries });
  }
}