import { Either, left, right } from '@/core/either';
import { RecipientNotFoundError } from './errors/recipient-not-found-error';
import { RecipientRepository } from '../repositories/recipient-repository';
import { Recipient } from '../../enterprise/entities/recipient';
import { Injectable } from '@nestjs/common';

interface ReadRecipientRequest {
  id?: string;
}

type ReadRecipientResponse = Either<
  RecipientNotFoundError,
  { recipient: Recipient[] }
>;

@Injectable()
export class ReadRecipientUseCase {
  constructor(private readonly recipientRepository: RecipientRepository) {}

  async execute({ id }: ReadRecipientRequest): Promise<ReadRecipientResponse> {
    if (id) {
      const recipient = await this.recipientRepository.findById(id);

      if (!recipient) {
        return left(new RecipientNotFoundError(id));
      }

      return right({ recipient: [recipient] });
    }

    const allRecipients = await this.recipientRepository.findAll();
    return right({ recipient: allRecipients });
  }
}
