import { UseCaseError } from '@/core/erros/use-case-error';

export class CreateRecipientError extends Error implements UseCaseError {
  constructor() {
    super('Error creating recipient');
  }
}
