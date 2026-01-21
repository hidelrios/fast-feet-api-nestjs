import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { ReadDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/read-delivery-people';
import { Roles } from '@/infra/auth/roles';

@Controller('/delivery-people')
export class ReadDeliveryPeopleController {
  constructor(private readDeliveryPeople: ReadDeliveryPeopleUseCase) {}
  @Roles('ADMIN')
  @Get()
  async handle(
    @Query('id') id?: string,
    @Query('cpf') cpf?: string,
  ): Promise<any> {
    const result = await this.readDeliveryPeople.execute({ id, cpf });

    if (result.isLeft()) {
      const error = result.value;
      throw new BadRequestException(error.message);
    }
    return result.value; // pode ser um usuário ou lista
  }
}
