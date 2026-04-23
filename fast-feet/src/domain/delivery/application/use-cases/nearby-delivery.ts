import { Injectable } from '@nestjs/common';
import { RecipientRepository } from '../repositories/recipient-repository';
import { getDistance } from 'geolib';
import { Either, left, right } from '@/core/either';
import { GetNearbyDeliveryError } from './errors/get-nearby-delivery-error';
import { Recipient } from '../../enterprise/entities/recipient';

type NearbyDeliveryUseCaseResponse = Either<GetNearbyDeliveryError, { recipients: Recipient[] }>;

@Injectable()
export class NearbyDeliveryUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) { }

  async execute(
    deliverymanLat: string,
    deliverymanLng: string,
    maximumDistance: number,
  ): Promise<NearbyDeliveryUseCaseResponse> {
    try {
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
      return right({ recipients: recipientsNexts });
    } catch (error) {
      return left(new GetNearbyDeliveryError());
    }
  }
}
