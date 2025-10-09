import { Either, left, right } from "@/core/either";
import { Delivery, DeliveryStatus } from "../../enterprise/entities/delivery";
import { DeliveryRepository } from "../repositories/delivery-repository";
import { CreateDeliveryError } from "./errors/create-delivery-error";
import { DeliveryPeopleRepository } from "@/domain/user/application/repositories/delivery-people-repository";
import { DeliveryManNotFoundError } from "./errors/deliveryman-not-found-error";
import { RecipientRepository } from "../repositories/recipient-repository";
import { RecipientNotFoundError } from "./errors/recipient-not-found-error";

interface CreateDeliveryRequest {
  product: string;
  recipientId: string;
  deliverymanId: string;
  status?: DeliveryStatus;
  photoUrl?: string;
}

type CreateDeliveryResponse = Either<CreateDeliveryError | DeliveryManNotFoundError | RecipientNotFoundError, { delivery: Delivery }>;

export class CreateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository,
    private deliveryManRepository: DeliveryPeopleRepository,
    private recipientRepository: RecipientRepository
  ) { }

  async execute({ product, deliverymanId, recipientId, photoUrl }: CreateDeliveryRequest): Promise<CreateDeliveryResponse> {
    const findDeliveryman = await this.deliveryManRepository.findById(deliverymanId);

    if (!findDeliveryman) {
      return left(new DeliveryManNotFoundError(deliverymanId));
    }

    const recipient = await this.recipientRepository.findById(recipientId);

    if (!recipient) {
      return left(new RecipientNotFoundError(recipientId));
    }

    try {
      const delivery = Delivery.create({
        product: product,
        recipientId: recipientId,
        deliverymanId: deliverymanId,
        photoUrl: photoUrl,
        status: DeliveryStatus.PENDING,
      });

      await this.deliveryRepository.create(delivery);

      return right({ delivery });
    } catch (err) {
      return left(new CreateDeliveryError());
    }
  }
}