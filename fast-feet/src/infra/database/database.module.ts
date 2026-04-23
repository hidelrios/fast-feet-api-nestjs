import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DeliveryPeopleRepository } from '@/domain/user/application/repositories/delivery-people-repository';
import { PrismaDeliveryPeopleRepository } from './prisma/repositories/prisma-delivery-people-repository';
import { DeliveryRepository } from '@/domain/delivery/application/repositories/delivery-repository';
import { PrismaDeliveryRepository } from './prisma/repositories/prisma-delivery-repository';
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository';
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository';
import { UserRepository } from '@/domain/auth/application/repositories/user-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: DeliveryPeopleRepository,
      useClass: PrismaDeliveryPeopleRepository,
    },
    {
      provide: DeliveryRepository,
      useClass: PrismaDeliveryRepository,
    },
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    }
  ],
  exports: [DeliveryPeopleRepository, DeliveryRepository, RecipientRepository, UserRepository],
})
export class DatabaseModule {}
