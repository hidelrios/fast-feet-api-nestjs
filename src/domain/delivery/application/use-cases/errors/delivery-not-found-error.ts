import { UseCaseError } from "@/core/erros/use-case-error";

export class DeliveryNotFoundError
  extends Error
  implements UseCaseError
{
  constructor(deliveryId: string) {
    super(`Delivery with ID ${deliveryId} not found`);
  }
}
