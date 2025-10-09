import { BadRequestException, Controller, Delete, NotFoundException, Param } from '@nestjs/common';
import { DeleteDeliveryUseCase } from '@/domain/delivery/application/use-cases/delete-delivery';
import { DeliveryNotFoundError } from '@/domain/delivery/application/use-cases/errors/delivery-not-found-error';

@Controller('/delivery')
export class DeleteDeliveryController {
  constructor(private deleteDelivery: DeleteDeliveryUseCase) {}

  @Delete(':id')
  async handle(
    @Param('id') id: string,
  ): Promise<any> {
    const result = await this.deleteDelivery.execute({
      id,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryNotFoundError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return result;
  }
}
