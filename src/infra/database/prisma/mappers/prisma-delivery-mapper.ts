import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Delivery, DeliveryStatus } from '@/domain/delivery/enterprise/entities/delivery';
import { Delivery as PrismaDelivery, Prisma, DeliveryStatus as PrismaDeliveryStatus } from '@prisma/client';

export class PrismaDeliveryMapper {
  static mapPrismaStatusToDomain(status: PrismaDeliveryStatus): DeliveryStatus {
  switch (status) {
    case 'PENDING':
      return DeliveryStatus.PENDING;
    case 'WITHDRAWN':
      return DeliveryStatus.WITHDRAWN;
    case 'DELIVERED':
      return DeliveryStatus.DELIVERED;
    case 'RETURNED':
      return DeliveryStatus.RETURNED;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
}
  static toDomain(raw: PrismaDelivery): Delivery {
    return Delivery.create(
      {
        product: raw.product,
        status: this.mapPrismaStatusToDomain(raw.status),
        photoUrl: raw.photoUrl ?? undefined,
        recipientId: raw.recipientId,
        deliverymanId: raw.deliverymanId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPrisma(delivery: Delivery): Prisma.DeliveryCreateInput {
    return {
      id: delivery.id.toString(),
      product: delivery.product,
      status: delivery.status,
      photoUrl: delivery.photoUrl ?? null,
      recipient: {
        connect: { id: delivery.recipientId },
      },
      deliveryman: {
        connect: { id: delivery.deliverymanId },
      },
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
      deletedAt: delivery.deletedAt ?? null,
    };
  }
}
