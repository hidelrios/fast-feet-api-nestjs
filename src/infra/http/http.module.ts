import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateDeliveryPeopleController } from './controllers/delivery-people/create-delivery-people.controller';
import { CreateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/create-delivery-people';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { UpdateDeliveryPeopleController } from './controllers/delivery-people/update-delivery-people.controller';
import { UpdateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/update-delivery-people';
import { DeleteDeliveryPeopleController } from './controllers/delivery-people/delete-delivery-people.controller';
import { DeleteDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/delete-delivery-people';
import { ReadDeliveryPeopleController } from './controllers/delivery-people/read-delivery-people.controller';
import { ReadDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/read-delivery-people';
import { CreateDeliveryController } from './controllers/delivery/create-delivery.controller';
import { DeleteDeliveryController } from './controllers/delivery/delete-delivery.controller';
import { ReadDeliveryController } from './controllers/delivery/read-delivery.controller';
import { UpdateDeliveryController } from './controllers/delivery/update-delivery.controller';
import { CreateDeliveryUseCase } from '@/domain/delivery/application/use-cases/create-delivery';
import { DeleteDeliveryUseCase } from '@/domain/delivery/application/use-cases/delete-delivery';
import { ReadDeliveryUseCase } from '@/domain/delivery/application/use-cases/read-delivery';
import { UpdateDeliveryUseCase } from '@/domain/delivery/application/use-cases/update-delivery';
import { DeleteRecipientController } from './controllers/recipient/delete-recipient.controller';
import { CreateRecipientController } from './controllers/recipient/create-recipient.controller';
import { ReadRecipientController } from './controllers/recipient/read-recipient.controller';
import { UpdateRecipientController } from './controllers/recipient/update-delivery.controller';
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient';
import { ReadRecipientUseCase } from '@/domain/delivery/application/use-cases/read-recipient';
import { UpdateRecipientUseCase } from '@/domain/delivery/application/use-cases/update-recipient';
import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient';
import { UpdateDeliveryStatusController } from './controllers/delivery/update-status-delivery.controller';
import { UpdateDeliveryStatusUseCase } from '@/domain/delivery/application/use-cases/update-delivery-status';
import { NearbyDeliveryUseCase } from '@/domain/delivery/application/use-cases/nearby-delivery';
import { NearbyDeliveryController } from './controllers/delivery/nearby-delivery.controller';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { AuthenticationUseCase } from '@/domain/auth/application/use-cases/auth.use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateDeliveryPeopleController,
    UpdateDeliveryPeopleController,
    DeleteDeliveryPeopleController,
    ReadDeliveryPeopleController,
    CreateDeliveryController,
    DeleteDeliveryController,
    ReadDeliveryController,
    UpdateDeliveryController,
    CreateRecipientController,
    ReadRecipientController,
    UpdateRecipientController,
    DeleteRecipientController,
    UpdateDeliveryStatusController,
    NearbyDeliveryController,
    AuthenticationController
  ],
  providers: [
    CreateDeliveryPeopleUseCase,
    UpdateDeliveryPeopleUseCase,
    DeleteDeliveryPeopleUseCase,
    ReadDeliveryPeopleUseCase,
    CreateDeliveryUseCase,
    DeleteDeliveryUseCase,
    ReadDeliveryUseCase,
    UpdateDeliveryUseCase,
    CreateRecipientUseCase,
    ReadRecipientUseCase,
    UpdateRecipientUseCase,
    DeleteRecipientUseCase,
    UpdateDeliveryStatusUseCase,
    NearbyDeliveryUseCase,
    AuthenticationUseCase
  ],
  exports: [],
})
export class HttpModule {}
