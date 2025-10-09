import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { DeliveryRepository } from '@/domain/delivery/application/repositories/delivery-repository';
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery';
import { PrismaDeliveryMapper } from '../mappers/prisma-delivery-mapper';

@Injectable()
export class PrismaDeliveryRepository
  implements DeliveryRepository {
  constructor(private prisma: PrismaService) { }
  async findAll(): Promise<Delivery[]> {
    const deliveries = await this.prisma.delivery.findMany( );
    return deliveries.map(PrismaDeliveryMapper.toDomain);
  }
  async update(delivery: Partial<Delivery>): Promise<void> {
    const deliveryMapper = PrismaDeliveryMapper.toPrisma(delivery as Delivery);
    await this.prisma.delivery.update({
      where: {
        id: delivery.id?.toString(),
      },
      data: {
        ...deliveryMapper,
      },
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
