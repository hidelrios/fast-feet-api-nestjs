import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { NotifyRecipientHandler } from "./notify-recipient.handler";
import { NotificationService } from "./notification.service";
import { RecipientRepository } from "../delivery/application/repositories/recipient-repository";
import { PrismaRecipientRepository } from "@/infra/database/prisma/repositories/prisma-recipient-repository";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

@Module({
  providers: [NotifyRecipientHandler, NotificationService,  PrismaService, { provide: RecipientRepository, useClass:  PrismaRecipientRepository}],
  imports: [CqrsModule],
})
export class NotificationModule {}