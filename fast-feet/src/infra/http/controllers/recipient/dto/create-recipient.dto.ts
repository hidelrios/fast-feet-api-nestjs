import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecipientDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsOptional()
  complement: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;
}
