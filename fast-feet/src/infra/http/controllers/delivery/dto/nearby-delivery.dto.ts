import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NearbyDeliveryDTO {
  @IsNotEmpty()
  @IsString()
  deliverymanLat: string;

  @IsNotEmpty()
  @IsString()
  deliverymanLng: string;

  @IsNotEmpty()
  @IsNumber()
  maximumDistance: number;
}
