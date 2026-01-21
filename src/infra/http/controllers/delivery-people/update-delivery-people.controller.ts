import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UpdateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/update-delivery-people';
import { UpdateDeliveryPeopleDTO } from './dto/update-delivery-people.dto';
import { DeliveryPeopleNotExistsError } from '@/domain/user/application/use-cases/erros/delivery-people-not-exists-error';
import { Roles } from '@/infra/auth/roles';

@Controller('/delivery-people')
export class UpdateDeliveryPeopleController {
  constructor(private updateDeliveryPeople: UpdateDeliveryPeopleUseCase) {}
  @Roles('ADMIN')
  @Put()
  async handle(
    @Body() updateDeliveryPeopleDTO: UpdateDeliveryPeopleDTO,
  ): Promise<any> {
    const { id, name, cpf } = updateDeliveryPeopleDTO;
    const result = await this.updateDeliveryPeople.execute({
      id,
      name,
      cpf,
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
