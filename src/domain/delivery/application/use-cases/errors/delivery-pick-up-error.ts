import { UseCaseError } from "@/core/erros/use-case-error";

export class PickUpDeliveryError extends Error implements UseCaseError {
    constructor(message: string) {
    super(message);
  }
}