export class DeliveryStatusUpdatedEvent {
  constructor(
    public readonly deliveryId: string,
    public readonly recipientId: string,
    public readonly status: string,
  ) {}
}