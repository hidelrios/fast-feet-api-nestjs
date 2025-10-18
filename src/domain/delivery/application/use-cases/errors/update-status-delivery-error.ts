import { UseCaseError } from "@/core/erros/use-case-error";

export class UpdateStatusDeliveryError extends Error implements UseCaseError {
  constructor(status: string) {
    super(`Cannot mark delivery as available from status: ${status}`);
  }
}