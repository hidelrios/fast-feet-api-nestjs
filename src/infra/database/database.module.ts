import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DeliveryPeopleRepository } from '@/domain/user/application/repositories/delivery-people-repository';
import { PrismaDeliveryPeopleRepository } from './prisma/repositories/prisma-delivery-people-repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: DeliveryPeopleRepository,
      useClass: PrismaDeliveryPeopleRepository,
    },
  ],
  exports: [DeliveryPeopleRepository],
})
export class DatabaseModule {}
