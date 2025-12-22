import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticationDTO {
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}