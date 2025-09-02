import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum UserRole {
  DELIVERY_PERSON = 'DELIVERY_PERSON',
}

export class CreateDeliveryPeopleDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
