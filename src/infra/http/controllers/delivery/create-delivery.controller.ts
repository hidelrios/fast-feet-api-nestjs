import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { CreateDeliveryUseCase } from '@/domain/delivery/application/use-cases/create-delivery';
import { CreateDeliveryDTO } from './dto/create-delivery.dto';
import { DeliveryManNotFoundError } from '@/domain/delivery/application/use-cases/errors/deliveryman-not-found-error';
import { RecipientNotFoundError } from '@/domain/delivery/application/use-cases/errors/recipient-not-found-error';

@Controller('/delivery')
export class CreateDeliveryController {
  constructor(private createDelivery: CreateDeliveryUseCase) {}

  @Post()
  async handle(
    @Body() createDeliveryDTO: CreateDeliveryDTO,
  ): Promise<any> {
    const { product, photoUrl, status, deliverymanId, recipientId } = createDeliveryDTO;
    const result = await this.createDelivery.execute({
      product,
      photoUrl,
      status,
      deliverymanId,
      recipientId
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryManNotFoundError:
        case RecipientNotFoundError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }

    return result;
  }
}
