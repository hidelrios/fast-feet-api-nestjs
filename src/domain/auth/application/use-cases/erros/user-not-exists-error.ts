import { UseCaseError } from "@/core/erros/use-case-error";

export class UserNotExistsError
  extends Error
  implements UseCaseError
{
  constructor(cpf: string) {
    super(`User with cpf ${cpf} not found.`);
  }
}
