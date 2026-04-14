import { DeliveryNotFoundError } from '@/domain/delivery/application/use-cases/errors/delivery-not-found-error';
import { UpdateDeliveryStatusUseCase } from '@/domain/delivery/application/use-cases/update-delivery-status';
import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DeliveryPresenter } from '../../presenters/delivery-presenter';

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

  @Post(':id/withdrawn')
  async markAsWithdrawn(@Param('id') id: string): Promise<any> {
    const result = await this.updateDeliveryStatus.markAsWithdrawn(id);

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

  @Post(':id/delivered')
  async markAsDelivery(
    @Param('id') id: string,
    @Query('photoUrl') photoUrl: string,
  ): Promise<any> {
    const result = await this.updateDeliveryStatus.markAsDelivered(
      id,
      photoUrl,
    );

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

  @Post(':id/returned')
  async markAsReturned(@Param('id') id: string): Promise<any> {
    const result = await this.updateDeliveryStatus.markAsReturned(id);

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
}
