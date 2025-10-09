import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient';
import { Prisma, Recipient as PrismaRecipient } from '@prisma/client';

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        name: raw.name,
        street: raw.street,
        number: raw.number,
        complement: raw.complement ?? undefined,
        state: raw.state,
        city: raw.city,
        zipCode: raw.zipCode,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPrisma(recipient: Recipient): Prisma.RecipientCreateInput {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      street: recipient.street,
      number: recipient.number,
      complement: recipient.complement ?? null,
      state: recipient.state,
      city: recipient.city,
      zipCode: recipient.zipCode,
      createdAt: recipient.createdAt,
      updatedAt: recipient.updatedAt,
      deletedAt: recipient.deletedAt ?? null,
    };
  }
}
