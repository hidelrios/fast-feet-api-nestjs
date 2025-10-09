import { UseCaseError } from "@/core/erros/use-case-error";

export class RecipientNotFoundError
  extends Error
  implements UseCaseError
{
  constructor(recipientId: string) {
    super(`Recipient with ID ${recipientId} not found`);
  }
}
