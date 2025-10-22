import { NearbyDeliveryUseCase } from '@/domain/delivery/application/use-cases/nearby-delivery';
import { Body, Controller, Get } from '@nestjs/common';
import { NearbyDeliveryDTO } from './dto/nearby-delivery.dto';

@Controller('/delivery/nearby')
export class NearbyDeliveryController {
  constructor(private readonly nearbyDeliveryUseCase: NearbyDeliveryUseCase) {}

  @Get()
  async handle(@Body() nearbyDeliveryDTO: NearbyDeliveryDTO): Promise<any> {
    const { deliverymanLat, deliverymanLng, maximumDistance } =
      nearbyDeliveryDTO;
    return await this.nearbyDeliveryUseCase.execute(
      deliverymanLat,
      deliverymanLng,
      maximumDistance,
    );
  }
}
