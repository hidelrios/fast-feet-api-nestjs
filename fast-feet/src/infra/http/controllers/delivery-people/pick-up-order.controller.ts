import { PickUpDeliveryUseCase } from "@/domain/delivery/application/use-cases/pick-up-delivery";
import { Roles } from "@/infra/auth/roles";
import { Post, Param, BadRequestException, Controller, Request } from "@nestjs/common";
import { Role } from "@prisma/client";

@Controller('/delivery')
export class PickUpDeliveryController {
  constructor(private pickUpDelivery: PickUpDeliveryUseCase) { }

  @Roles('DELIVERYMAN')
  @Post(':id/pick-up')
  async handle(
    @Param('id') deliveryId: string,
    @Request() req: any,
  ): Promise<any> {
    const deliverymanId = req.user.sub;
      const res = await this.pickUpDelivery.execute(deliveryId, deliverymanId);
      if (res.isLeft()) {
        const error = res.value;
        return new BadRequestException(error.message);
      }
      return { message: 'Delivery picked up successfully' };
  }
}