import { DeliveryNotFoundError } from '@/domain/delivery/application/use-cases/errors/delivery-not-found-error';
import { DeliveryNotAssignedToDeliverymanError } from '@/domain/delivery/application/use-cases/errors/delivery-not-assigned-to-deliveryman-error';
import { UpdateDeliveryStatusUseCase } from '@/domain/delivery/application/use-cases/update-delivery-status';
import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Post,
  Query,
  Request
} from '@nestjs/common';
import { DeliveryPresenter } from '../../presenters/delivery-presenter';
import { Roles } from '@/infra/auth/roles';

@Controller('/delivery')
export class UpdateDeliveryStatusController {
  constructor(private updateDeliveryStatus: UpdateDeliveryStatusUseCase) {}

  @Post(':id/pending')
  async markAsAvailable(@Param('id') id: string): Promise<any> {
    const result = await this.updateDeliveryStatus.markAsAvailable(id);

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryNotFoundError:
          return new NotFoundException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return { delivery: DeliveryPresenter.toHttp(result.value.delivery) };
  }

  @Roles('DELIVERYMAN')
  @Post(':id/withdrawn')
  async markAsWithdrawn(@Param('id') id: string, @Request() req: any): Promise<any> {
    const deliverymanId = req.user.sub;
    const result = await this.updateDeliveryStatus.markAsWithdrawn(id, deliverymanId);

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryNotFoundError:
          return new NotFoundException(result.value.message);
        case DeliveryNotAssignedToDeliverymanError:
          return new BadRequestException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return { delivery: DeliveryPresenter.toHttp(result.value.delivery) };
  }

  @Roles('DELIVERYMAN')
  @Post(':id/delivered')
  async markAsDelivery(
    @Param('id') id: string,
    @Query('photoUrl') photoUrl: string,
    @Request() req: any,
  ): Promise<any> {
    const deliverymanId = req.user.sub;
    const result = await this.updateDeliveryStatus.markAsDelivered(
      id,
      photoUrl,
      deliverymanId
    );

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryNotFoundError:
          return new NotFoundException(result.value.message);
        case DeliveryNotAssignedToDeliverymanError:
          return new BadRequestException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return { delivery: DeliveryPresenter.toHttp(result.value.delivery) };
  }

  @Roles('DELIVERYMAN')
  @Post(':id/returned')
  async markAsReturned(@Param('id') id: string, @Request() req: any): Promise<any> {
    const deliverymanId = req.user.sub;
    const result = await this.updateDeliveryStatus.markAsReturned(id, deliverymanId);

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case DeliveryNotFoundError:
          return new NotFoundException(result.value.message);
        case DeliveryNotAssignedToDeliverymanError:
          return new BadRequestException(result.value.message);
        default:
          return new BadRequestException(result.value.message);
      }
    }
    return { delivery: DeliveryPresenter.toHttp(result.value.delivery) };
  }
}
