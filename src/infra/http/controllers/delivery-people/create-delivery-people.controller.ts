import { CreateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/create-delivery-people';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateDeliveryPeopleDTO } from './dto/create-delivery-people.dto';
import { DeliveryPeopleAlreadyExistsError } from '@/domain/user/application/use-cases/erros/delivery-people-already-exists-error';
import { Roles } from '@/infra/auth/roles';
import { DeliveryPeoplePresenter } from '../../presenters/delivery-people-presenter';

@Controller('/delivery-people')
export class CreateDeliveryPeopleController {
  constructor(private createDeliveryPeople: CreateDeliveryPeopleUseCase) {}
  @Roles('ADMIN')
  @Post()
  async handle(
    @Body() createDeliveryPeopleDTO: CreateDeliveryPeopleDTO,
  ): Promise<any> {
    const { name, cpf, password } = createDeliveryPeopleDTO;
    const result = await this.createDeliveryPeople.execute({
      name,
      cpf,
      password,
    });

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryPeopleAlreadyExistsError:
          return new ConflictException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }

    const deliveryPeople = result.value.deliveryPerson;
    return { deliveryPeople: DeliveryPeoplePresenter.toHTTP(deliveryPeople) };
  }
}
