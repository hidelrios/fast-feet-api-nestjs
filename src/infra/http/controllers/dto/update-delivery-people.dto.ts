import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class UpdateDeliveryPeopleDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
  
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cpf: string;
}
