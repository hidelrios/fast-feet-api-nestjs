import { BadRequestException, Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { ChangePasswordDTO } from "./dto/change-password.dto";
import { ChangePasswordUseCase } from "@/domain/auth/application/use-cases/change-password.use-case";
import { UserNotExistsError } from "@/domain/auth/application/use-cases/erros/user-not-exists-error";
import { Roles } from "@/infra/auth/roles";

@Controller('auth')
export class ChangePasswordController {
  constructor(private changePasswordUseCase: ChangePasswordUseCase) {}

  @Roles('ADMIN')
  @Post('/change-password')
  async changePassword(
    @Body() body: ChangePasswordDTO,
  ): Promise<any> {
    
    const { currentPassword, newPassword, userId } = body;

    const result = await this.changePasswordUseCase.execute(
      userId,
      currentPassword,
      newPassword,
    );

    if (result.isLeft()) {
      const error = result.value;
      switch (result.value.constructor) {
        case UserNotExistsError:
          return new NotFoundException(error.message);
        default:
          return new BadRequestException(error.message);
      }
    }
    return { message: result.value.message };
  
  }

}