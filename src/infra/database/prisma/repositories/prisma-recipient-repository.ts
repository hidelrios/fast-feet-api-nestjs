import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository';
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient';
import { PrismaService } from '../prisma.service';
import { PrismaRecipientMapper } from '../mappers/prisma-recipient-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaRecipientRepository implements RecipientRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: Recipient): Promise<void> {
    const recipient = PrismaRecipientMapper.toPrisma(data);
    await this.prisma.recipient.create({
      data: recipient,
    });
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = await this.prisma.recipient.findUnique({
      where: {
        id,
      },
    });

    if (!recipient) {
      return null;
    }
    return PrismaRecipientMapper.toDomain(recipient);
  }

  async findAll(): Promise<Recipient[]> {
    const recipients = await this.prisma.recipient.findMany();
    return recipients.map(PrismaRecipientMapper.toDomain);
  }

  async update(data: Partial<Recipient>): Promise<void> {
    const recipient = PrismaRecipientMapper.toPrisma(data as Recipient);
    await this.prisma.recipient.update({
      where: {
        id: data.id?.toString(),
      },
      data: {
        ...recipient,
      },
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.recipient.delete({
      where: {
        id,
      },
    });
  }
}
