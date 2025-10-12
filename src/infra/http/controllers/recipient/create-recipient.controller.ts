import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { DeliveryManNotFoundError } from '@/domain/delivery/application/use-cases/errors/deliveryman-not-found-error';
import { RecipientNotFoundError } from '@/domain/delivery/application/use-cases/errors/recipient-not-found-error';
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient';
import { CreateRecipientError } from '@/domain/delivery/application/use-cases/errors/create-recipient-error';
import { CreateRecipientDTO } from './dto/create-recipient.dto';

@Controller('/recipient')
export class CreateRecipientController {
  constructor(private createRecipient: CreateRecipientUseCase) {}

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
    return result;
  }
}
