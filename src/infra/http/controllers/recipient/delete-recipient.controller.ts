import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient';
import { RecipientNotFoundError } from '@/domain/delivery/application/use-cases/errors/recipient-not-found-error';
import { Roles } from '@/infra/auth/roles';

@Controller('/recipient')
export class DeleteRecipientController {
  constructor(private deleteRecipientUseCase: DeleteRecipientUseCase) {}
  @Roles('ADMIN')
  @Delete(':id')
  async handle(@Param('id') id: string): Promise<any> {
    const result = await this.deleteRecipientUseCase.execute({
      id,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case RecipientNotFoundError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return result;
  }
}
