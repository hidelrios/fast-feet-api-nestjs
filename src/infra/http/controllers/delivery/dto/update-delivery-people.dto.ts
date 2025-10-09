import { DeliveryStatus } from '@/domain/delivery/enterprise/entities/delivery';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class UpdateDeliveryDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
  
  @IsOptional()
  @IsString()
  product: string;

  @IsOptional()
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @IsOptional()
  @IsOptional()
  photoUrl: string;

  @IsOptional()
  @IsString()
  recipientId: string;

  @IsOptional()
  @IsString()
  deliverymanId: string;
}

