import { UseCaseError } from "@/core/erros/use-case-error";

export class GetNearbyDeliveryError extends Error implements UseCaseError {
  constructor() {
    super(`Error occurred while fetching nearby deliveries`);
  }
}
