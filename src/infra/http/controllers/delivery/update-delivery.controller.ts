import { BadRequestException, Body, Controller, NotFoundException, Put } from '@nestjs/common';
import { UpdateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/update-delivery-people';
import { DeliveryPeopleNotExistsError } from '@/domain/user/application/use-cases/erros/delivery-people-not-exists-error';
import { UpdateDeliveryUseCase } from '@/domain/delivery/application/use-cases/update-delivery';
import { UpdateDeliveryDTO } from './dto/update-delivery-people.dto';

@Controller('/delivery')
export class UpdateDeliveryController {
  constructor(private updateDelivery: UpdateDeliveryUseCase) { }

  @Put()
  async handle(
    @Body() updateDeliveryDTO: UpdateDeliveryDTO,
  ): Promise<any> {
    const { id, product, photoUrl, status, deliverymanId, recipientId } = updateDeliveryDTO;
    const result = await this.updateDelivery.execute({
      id,
      photoUrl,
      product,
      status,
      recipientId,
      deliverymanId,

    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryPeopleNotExistsError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return result;
  }
}
