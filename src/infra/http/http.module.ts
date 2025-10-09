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

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateDeliveryPeopleController, UpdateDeliveryPeopleController, DeleteDeliveryPeopleController, ReadDeliveryPeopleController, CreateDeliveryController, DeleteDeliveryController, ReadDeliveryController, UpdateDeliveryController],
  providers: [CreateDeliveryPeopleUseCase, UpdateDeliveryPeopleUseCase, DeleteDeliveryPeopleUseCase, ReadDeliveryPeopleUseCase, CreateDeliveryUseCase, DeleteDeliveryUseCase, ReadDeliveryUseCase, UpdateDeliveryUseCase],
  exports: [],
})
export class HttpModule {}
