import { GetDeliveryByDeliverymanError } from "@/domain/delivery/application/use-cases/errors/get-delivery-by-deliveryman-error";
import { GetDeliveryByDeliverymanUseCase } from "@/domain/delivery/application/use-cases/get-delivery-by-deliveryman";
import { Roles } from "@/infra/auth/roles";
import { BadRequestException, Controller, Get, InternalServerErrorException, Request } from "@nestjs/common";
import { DeliveryPresenter } from "../../presenters/delivery-presenter";

@Controller('/delivery/deliveryman')
export class GetDeliveryByDeliverymanController {

  constructor(private readonly getDeliveryByDeliverymanUseCase: GetDeliveryByDeliverymanUseCase){}

    @Roles('DELIVERYMAN')
    @Get()
    async handle( @Request() req: any,
    ): Promise<any> { 
      const deliverymanId = req.user.sub;
      const result = await this.getDeliveryByDeliverymanUseCase.execute(deliverymanId);

      if (result.isLeft()) {
        switch (result.value.constructor) {
          case GetDeliveryByDeliverymanError:
            return new BadRequestException(result.value.message);
          default:
            return new InternalServerErrorException(result.value.message);
        }
    }
    return { deliveries: result.value.deliveries.map((d) => DeliveryPresenter.toHttp(d)) };
  }
  
}