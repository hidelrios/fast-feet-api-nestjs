import { UseCaseError } from "@/core/erros/use-case-error";

export class GetDeliveryByDeliverymanError extends Error implements UseCaseError {
  constructor() {
    super(`Error occurred while fetching deliveries for the deliveryman`);
  }

}