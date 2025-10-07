import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateDeliveryPeopleController } from './controllers/create-delivery-people.controller';
import { CreateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/create-delivery-people';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { UpdateDeliveryPeopleController } from './controllers/update-delivery-people.controller';
import { UpdateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/update-delivery-people';
import { DeleteDeliveryPeopleController } from './controllers/delete-delivery-people.controller';
import { DeleteDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/delete-delivery-people';
import { ReadDeliveryPeopleController } from './controllers/read-delivery-people.controller';
import { ReadDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/read-delivery-people';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateDeliveryPeopleController, UpdateDeliveryPeopleController, DeleteDeliveryPeopleController, ReadDeliveryPeopleController],
  providers: [CreateDeliveryPeopleUseCase, UpdateDeliveryPeopleUseCase, DeleteDeliveryPeopleUseCase, ReadDeliveryPeopleUseCase],
  exports: [],
})
export class HttpModule {}
