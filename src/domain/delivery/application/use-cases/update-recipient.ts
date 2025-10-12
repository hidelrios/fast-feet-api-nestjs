import { Either, left, right } from '@/core/either';
import { RecipientNotFoundError } from './errors/recipient-not-found-error';
import { Recipient } from '../../enterprise/entities/recipient';
import { RecipientRepository } from '../repositories/recipient-repository';
import { Injectable } from '@nestjs/common';

interface UpdateRecipientRequest {
  id: string;
  name?: string;
  street?: string;
  number?: string;
  complement?: string;
  state?: string;
  city?: string;
  zipCode?: string;
}

type UpdateRecipientResponse = Either<
  RecipientNotFoundError,
  { recipient: Recipient }
>;

@Injectable()
export class UpdateRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute(
    props: UpdateRecipientRequest,
  ): Promise<UpdateRecipientResponse> {
    const recipientAlreadyExists = await this.recipientRepository.findById(
      props.id,
    );

    if (!recipientAlreadyExists) {
      return left(new RecipientNotFoundError(props.id));
    }

    recipientAlreadyExists.update({ ...props });

    await this.recipientRepository.update(recipientAlreadyExists);

    return right({ recipient: recipientAlreadyExists });
  }
}
