import { EventBus } from '@nestjs/cqrs';
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery';
import { DeliveryStatusUpdatedEvent } from '@/domain/events/delivery-status-updated.event';

export function publishStatusEvent(eventBus: EventBus, delivery: Delivery) {
  eventBus.publish(
    new DeliveryStatusUpdatedEvent(
      delivery.id.toString(),
      delivery.recipientId,
      delivery.status,
    ),
  );
}
