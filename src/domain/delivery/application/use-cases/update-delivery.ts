import { Either, left, right } from "@/core/either";
import { Delivery } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { DeliveryNotFoundError } from "./errors/delivery-not-found-error";

interface UpdateDeliveryRequest {
  id: string;
  product?: string;
  status?: string;
  photoUrl?: string;
  recipientId?: string;
  deliverymanId?: string;
}

type UpdateDeliveryResponse = Either<DeliveryNotFoundError, { delivery: Delivery }>;

export class UpdateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository,
  ) { }

  async execute({ id, product, status, photoUrl, deliverymanId, recipientId }: UpdateDeliveryRequest): Promise<UpdateDeliveryResponse> {
    const deliveryAlreadyExists = await this.deliveryRepository.findById(id);

    if (!deliveryAlreadyExists) {
      return left(new DeliveryNotFoundError(id));
    }

    deliveryAlreadyExists.update({product, status, photoUrl, deliverymanId, recipientId});

    await this.deliveryRepository.update(deliveryAlreadyExists);

    return right({ delivery: deliveryAlreadyExists });
  }
}