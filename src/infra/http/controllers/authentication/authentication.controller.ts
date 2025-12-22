import { BadRequestException, Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { AuthenticationDTO } from "./dto/authentication.dto";
import { AuthenticationUseCase } from "@/domain/auth/application/use-cases/auth.use-case";
import { UserNotExistsError } from "@/domain/auth/application/use-cases/erros/user-not-exists-error";

@Controller('auth')
export class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUseCase) { }

  @Post()
  async handle(@Body() authenticationDTO: AuthenticationDTO): Promise<any> {
    const { cpf, password } = authenticationDTO;

    const result = await this.authenticationUseCase.execute(cpf, password);

    if (result.isLeft()) {
      const error = result.value;
      switch (result.value.constructor) {
        case UserNotExistsError:
          return new NotFoundException(error.message);
        default:
          return new BadRequestException(error.message);
      }
    }
    return result;
  }
}