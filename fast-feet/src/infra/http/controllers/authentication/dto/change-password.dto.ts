import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDTO{
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}