import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeliveryStatusUpdatedEvent } from '../events/delivery-status-updated.event';
import { RecipientRepository } from '../delivery/application/repositories/recipient-repository';
import { NotificationService } from './notification.service';

@EventsHandler(DeliveryStatusUpdatedEvent)
export class NotifyRecipientHandler
  implements IEventHandler<DeliveryStatusUpdatedEvent>
{
  constructor(
    private recipientsRepository: RecipientRepository,
    private notificationService: NotificationService,
  ) {}

  async handle(event: DeliveryStatusUpdatedEvent) {
    const recipient = await this.recipientsRepository.findById(
      event.recipientId,
    );

    if (!recipient) return;

    await this.notificationService.send({
      to: 'teste@gmail.com',
      message: `Sua encomenda agora está: ${event.status}`,
    });
  }
}