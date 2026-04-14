import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ReadDeliveryUseCase } from '@/domain/delivery/application/use-cases/read-delivery';
import { DeliveryNotFoundError } from '@/domain/delivery/application/use-cases/errors/delivery-not-found-error';
import { DeliveryPresenter } from '../../presenters/delivery-presenter';
import { Public } from '@/infra/auth/public';
import { Roles } from '@/infra/auth/roles';

@Controller('/delivery')
export class ReadDeliveryController {
  constructor(private readDelivery: ReadDeliveryUseCase) {}

  @Roles('ADMIN')
  @Get()
  async handle(@Query('id') id?: string): Promise<any> {
    const result = await this.readDelivery.execute({ id });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryNotFoundError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    const delivery = result.value.delivery;
    return { deliveries:  delivery.map((d) => DeliveryPresenter.toHttp(d)) };
  }
}
