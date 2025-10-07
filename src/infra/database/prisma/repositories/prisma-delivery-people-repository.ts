import { DeliveryPeopleRepository } from '@/domain/user/application/repositories/delivery-people-repository';
import { PrismaService } from '../prisma.service';
import { User } from '@/domain/user/enterprise/entities/user';
import { PrismaDeliveryPeopleMapper } from '../mappers/prisma-delivery-people-mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaDeliveryPeopleRepository
  implements DeliveryPeopleRepository {
  constructor(private prisma: PrismaService) { }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: { role: 'DELIVERYMAN' } });
    return users.map(PrismaDeliveryPeopleMapper.toDomain);
  }
  async update(user: Partial<User>): Promise<void> {
    const userMapper = PrismaDeliveryPeopleMapper.toPrisma(user as User);
    await this.prisma.user.update({
      where: {
        id: user.id?.toString(),
      },
      data: {
        ...userMapper,
      },
    });
  }
  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
  async findById(id: string): Promise<User | null> {
    const deliveryPerson = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!deliveryPerson) {
      return null;
    }

    return PrismaDeliveryPeopleMapper.toDomain(deliveryPerson);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const deliveryPerson = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (!deliveryPerson) {
      return null;
    }

    return PrismaDeliveryPeopleMapper.toDomain(deliveryPerson);
  }
  async create(user: User): Promise<void> {
    const data = PrismaDeliveryPeopleMapper.toPrisma(user);

    await this.prisma.user.create({
      data: data,
    });
  }
}
