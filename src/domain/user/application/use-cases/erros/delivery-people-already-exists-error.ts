import { UseCaseError } from '@/core/erros/use-case-error';

export class DeliveryPeopleAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(cpf: string) {
    super(`Delivery person with CPF ${cpf} already exists.`);
  }
}
