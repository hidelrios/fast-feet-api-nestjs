import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient';
import { CreateRecipientError } from '@/domain/delivery/application/use-cases/errors/create-recipient-error';
import { CreateRecipientDTO } from './dto/create-recipient.dto';
import { Roles } from '@/infra/auth/roles';
import { RecipientPresenter } from '../../presenters/recipient-presenter';

@Controller('/recipient')
export class CreateRecipientController {
  constructor(private createRecipient: CreateRecipientUseCase) { }
  @Roles('ADMIN')
  @Post()
  async handle(@Body() createRecipientDTO: CreateRecipientDTO): Promise<any> {
    const result = await this.createRecipient.execute({
      ...createRecipientDTO,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case CreateRecipientError:
          return new BadRequestException(result.value.message);
        default:
          return new InternalServerErrorException(result.value.message);
      }
    }

    const recipient = result.value.recipient;

    return { recipient: RecipientPresenter.toHTTP(recipient) };
  }
}
