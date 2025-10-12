import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { DeliveryRepository } from '@/domain/delivery/application/repositories/delivery-repository';
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery';
import { PrismaDeliveryMapper } from '../mappers/prisma-delivery-mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
  constructor(private prisma: PrismaService) { }
  async findAll(): Promise<Delivery[]> {
    const deliveries = await this.prisma.delivery.findMany();
    return deliveries.map(PrismaDeliveryMapper.toDomain);
  }
  async update(delivery: Partial<Delivery>): Promise<void> {
    if (!delivery.id) {
      throw new Error('Delivery ID is required for update.');
    }

    const updateData: Prisma.DeliveryUpdateInput = {
      ...(delivery.product && { product: delivery.product }),
      ...(delivery.status && { status: delivery.status }),
      ...(delivery.photoUrl !== undefined && { photoUrl: delivery.photoUrl ?? null }),
      ...(delivery.recipientId && {
        recipient: { connect: { id: delivery.recipientId } },
      }),
      ...(delivery.deliverymanId && {
        deliveryman: { connect: { id: delivery.deliverymanId } },
      }),
      ...(delivery.createdAt && { createdAt: delivery.createdAt }),
      updatedAt: delivery.updatedAt ?? new Date(),
      ...(delivery.deletedAt !== undefined && { deletedAt: delivery.deletedAt }),
    };

    await this.prisma.delivery.update({
      where: { id: delivery.id.toString() },
      data: updateData,
    });
  }
  async delete(deliveryId: string): Promise<void> {
    await this.prisma.delivery.delete({
      where: {
        id: deliveryId,
      },
    });
  }
  async findById(id: string): Promise<Delivery | null> {
    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id,
      },
    });

    if (!delivery) {
      return null;
    }

    return PrismaDeliveryMapper.toDomain(delivery);
  }

  async create(delivery: Delivery): Promise<void> {
    const data = PrismaDeliveryMapper.toPrisma(delivery);

    await this.prisma.delivery.create({
      data: data,
    });
  }
}
