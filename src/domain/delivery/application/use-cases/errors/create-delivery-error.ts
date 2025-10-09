import { UseCaseError } from "@/core/erros/use-case-error";

export class CreateDeliveryError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Error creating delivery');
  }
}
