import { Injectable } from '@nestjs/common';
import { RecipientRepository } from '../repositories/recipient-repository';
import { getDistance } from 'geolib';

@Injectable()
export class NearbyDeliveryUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute(
    deliverymanLat: string,
    deliverymanLng: string,
    maximumDistance: number,
  ): Promise<any> {
    const recipients = await this.recipientRepository.findAll();

    const recipientsNexts = recipients.filter((recipient) => {
      if (recipient.latitude && recipient.longitude) {
        const distancia = getDistance(
          { latitude: deliverymanLat, longitude: deliverymanLng },
          { latitude: recipient.latitude, longitude: recipient.longitude },
        );
        return distancia <= maximumDistance;
      }
      return false;
    });
    return recipientsNexts;
  }
}
