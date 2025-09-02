import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateDeliveryPeopleController } from './controllers/create-delivery-people.controller';
import { CreateDeliveryPeopleUseCase } from '@/domain/user/application/use-cases/create-delivery-people';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateDeliveryPeopleController],
  providers: [CreateDeliveryPeopleUseCase],
  exports: [],
})
export class HttpModule {}
