import { UseCaseError } from "@/core/erros/use-case-error";

export class DeliveryManNotFoundError
  extends Error
  implements UseCaseError
{
  constructor(deliverymanId: string) {
    super(`Delivery man with ID ${deliverymanId} not found`);
  }
}
