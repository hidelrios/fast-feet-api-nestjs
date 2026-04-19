import { NearbyDeliveryUseCase } from '@/domain/delivery/application/use-cases/nearby-delivery';
import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { NearbyDeliveryDTO } from './dto/nearby-delivery.dto';
import { Public } from '@/infra/auth/public';
import { GetNearbyDeliveryError } from '@/domain/delivery/application/use-cases/errors/get-nearby-delivery-error';
import { DeliveryPresenter } from '../../presenters/delivery-presenter';
import { RecipientPresenter } from '../../presenters/recipient-presenter';

@Controller('/delivery/nearby')
export class NearbyDeliveryController {
  constructor(private readonly nearbyDeliveryUseCase: NearbyDeliveryUseCase) {}

  @Public()
  @Post()
  async handle(@Body() nearbyDeliveryDTO: NearbyDeliveryDTO): Promise<any> {
    const { deliverymanLat, deliverymanLng, maximumDistance } =
      nearbyDeliveryDTO;

     const result = await this.nearbyDeliveryUseCase.execute(
      deliverymanLat,
      deliverymanLng,
      maximumDistance,
    );
    if (result.isLeft()) {
      switch (result.value.constructor) {
        case GetNearbyDeliveryError:
          return new BadRequestException(result.value.message);
        default:
          return new InternalServerErrorException(result.value.message);
      }
    }
    return { deliveries:  result.value.recipients.map((d) => RecipientPresenter.toHTTP(d)) };
  }
}
