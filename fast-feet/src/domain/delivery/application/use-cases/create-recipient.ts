import { Either, left, right } from '@/core/either';
import { RecipientRepository } from '../repositories/recipient-repository';
import { Injectable, Logger } from '@nestjs/common';
import { Recipient } from '../../enterprise/entities/recipient';
import { CreateRecipientError } from './errors/create-recipient-error';

interface CreateRecipientRequest {
  name: string;
  street: string;
  number: string;
  complement?: string;
  state: string;
  city: string;
  zipCode: string;
  latitude: string;
  longitude: string;
}

type CreateRecipientResponse = Either<
  CreateRecipientError,
  { recipient: Recipient }
>;

@Injectable()
export class CreateRecipientUseCase {
  private readonly logger = new Logger(CreateRecipientUseCase.name);

  constructor(private recipientRepository: RecipientRepository) {}

  async execute(
    props: CreateRecipientRequest,
  ): Promise<CreateRecipientResponse> {
    try {
      const recipient = Recipient.create({
        name: props.name,
        street: props.street,
        number: props.number,
        complement: props.complement,
        state: props.state,
        city: props.city,
        zipCode: props.zipCode,
        latitude: props.latitude,
        longitude: props.longitude,
      });

      await this.recipientRepository.create(recipient);

      return right({ recipient });
    } catch (err) {
      this.logger.error('Error creating recipient', err);
      return left(new CreateRecipientError());
    }
  }
}
