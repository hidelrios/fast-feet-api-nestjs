import { BadRequestException, Controller,  Get,  NotFoundException,  Query } from '@nestjs/common';
import { ReadDeliveryUseCase } from '@/domain/delivery/application/use-cases/read-delivery';
import { DeliveryNotFoundError } from '@/domain/delivery/application/use-cases/errors/delivery-not-found-error';

@Controller('/delivery')
export class ReadDeliveryController {
  constructor(private readDelivery: ReadDeliveryUseCase) {}

  @Get()
  async handle(
    @Query('id') id?: string,
  ): Promise<any> {

    const result = await this.readDelivery.execute({ id });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryNotFoundError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
    }
    }
    return result.value;
  }
}
