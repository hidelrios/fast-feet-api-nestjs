import { DeliveryStatus } from '@/domain/delivery/enterprise/entities/delivery';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryDTO {
  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @IsNotEmpty()
  @IsOptional()
  photoUrl: string;

  @IsNotEmpty()
  @IsString()
  recipientId: string;

  @IsNotEmpty()
  @IsString()
  deliverymanId: string;
}
