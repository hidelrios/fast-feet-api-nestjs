import { UseCaseError } from '@/core/erros/use-case-error';

export class DeliveryNotAssignedToDeliverymanError extends Error implements UseCaseError {
  constructor(deliverymanId: string) {
    super(`Delivery is not assigned to deliveryman ${deliverymanId}`);
  }
}