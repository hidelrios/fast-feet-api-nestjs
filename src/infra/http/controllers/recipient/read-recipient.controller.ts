import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
} from '@nestjs/common';

import { ReadRecipientUseCase } from '@/domain/delivery/application/use-cases/read-recipient';
import { RecipientNotFoundError } from '@/domain/delivery/application/use-cases/errors/recipient-not-found-error';

@Controller('/recipient')
export class ReadRecipientController {
  constructor(private readRecipientUseCase: ReadRecipientUseCase) {}

  @Get()
  async handle(@Query('id') id?: string): Promise<any> {
    const result = await this.readRecipientUseCase.execute({ id });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case RecipientNotFoundError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return result.value;
  }
}
