import { CreateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/create-delivery-people';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateDeliveryPeopleDTO } from './dto/create-delivery-people.dto';

@Controller('/delivery-people')
export class CreateDeliveryPeopleController {
  constructor(private createDeliveryPeople: CreateDeliveryPeopleUseCase) {}

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
      return new BadRequestException(result.value.message);
    }

    return result;
  }
}
