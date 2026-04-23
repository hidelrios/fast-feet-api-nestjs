import { UseCaseError } from "@/core/erros/use-case-error";

export class AuthenticationError
  extends Error
  implements UseCaseError
{
  constructor() {
    super(`Authentication failed.`);
  }
}
