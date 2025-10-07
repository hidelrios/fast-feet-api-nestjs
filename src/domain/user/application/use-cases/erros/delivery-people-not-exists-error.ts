import { UseCaseError } from '@/core/erros/use-case-error';

export class DeliveryPeopleNotExistsError
  extends Error
  implements UseCaseError
{
  constructor(id: string) {
    super(`Delivery person with ID ${id} not exists.`);
  }
}
