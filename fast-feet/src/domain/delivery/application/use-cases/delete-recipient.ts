import { Either, left, right } from '@/core/either';
import { RecipientRepository } from '../repositories/recipient-repository';
import { RecipientNotFoundError } from './errors/recipient-not-found-error';
import { Injectable } from '@nestjs/common';

interface DeleteRecipientRequest {
  id: string;
}

type DeleteRecipientResponse = Either<RecipientNotFoundError, void>;

@Injectable()
export class DeleteRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    id,
  }: DeleteRecipientRequest): Promise<DeleteRecipientResponse> {
    const recipientAlreadyExists = await this.recipientRepository.findById(id);

    if (!recipientAlreadyExists) {
      return left(new RecipientNotFoundError(id));
    }

    await this.recipientRepository.delete(id);

    return right(undefined);
  }
}
