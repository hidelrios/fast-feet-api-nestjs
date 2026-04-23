import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UpdateRecipientUseCase } from '@/domain/delivery/application/use-cases/update-recipient';
import { UpdateRecipientDTO } from './dto/update-recipient.dto';
import { RecipientNotFoundError } from '@/domain/delivery/application/use-cases/errors/recipient-not-found-error';
import { Roles } from '@/infra/auth/roles';
import { RecipientPresenter } from '../../presenters/recipient-presenter';

@Controller('/recipient')
export class UpdateRecipientController {
  constructor(private updateRecipient: UpdateRecipientUseCase) {}
  @Roles('ADMIN')
  @Put()
  async handle(@Body() updateDeliveryDTO: UpdateRecipientDTO): Promise<any> {
    const result = await this.updateRecipient.execute({
      ...updateDeliveryDTO,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case RecipientNotFoundError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    
    const recipient = result.value.recipient;
    return { recipient: RecipientPresenter.toHTTP(recipient) };
  }
}
