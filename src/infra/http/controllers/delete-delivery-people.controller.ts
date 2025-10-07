import { BadRequestException, Body, ConflictException, Controller, Delete, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { UpdateDeliveryPeopleDTO } from './dto/update-delivery-people.dto';
import { DeleteDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/delete-delivery-people';
import { DeliveryPeopleNotExistsError } from '@/domain/user/application/use-cases/erros/delivery-people-not-exists-error';

@Controller('/delivery-people')
export class DeleteDeliveryPeopleController {
  constructor(private deleteDeliveryPeople: DeleteDeliveryPeopleUseCase) {}

  @Delete(':id')
  async handle(
    @Param('id') id: string,
  ): Promise<any> {
    const result = await this.deleteDeliveryPeople.execute({
      id,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryPeopleNotExistsError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return result;
  }
}
