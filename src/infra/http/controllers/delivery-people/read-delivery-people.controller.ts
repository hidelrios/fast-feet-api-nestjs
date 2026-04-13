import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { ReadDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/read-delivery-people';
import { Roles } from '@/infra/auth/roles';
import { DeliveryPeoplePresenter } from '../../presenters/delivery-people-presenter';

@Controller('/delivery-people')
export class ReadDeliveryPeopleController {
  constructor(private readDeliveryPeople: ReadDeliveryPeopleUseCase) {}

  @Roles('ADMIN')
  @Get()
  async handle(
    @Query('id') id?: string,
    @Query('cpf') cpf?: string,
  ): Promise<any> {
    if (!id && !cpf) {
      throw new BadRequestException('id or cpf must be provided');
    }
    const result = await this.readDeliveryPeople.execute({ id, cpf });

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }
    const deliveryPeople = result.value;

    return { deliveryPeople: deliveryPeople ? DeliveryPeoplePresenter.toHTTP(deliveryPeople) : null };
  }
}
