import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRecipientDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  number: string;

  @IsOptional()
  @IsOptional()
  complement: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  zipCode: string;
}
