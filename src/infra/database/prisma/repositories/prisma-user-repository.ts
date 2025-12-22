import { DeliveryPeopleRepository } from '@/domain/user/application/repositories/delivery-people-repository';
import { PrismaService } from '../prisma.service';
import { User } from '@/domain/user/enterprise/entities/user';
import { PrismaDeliveryPeopleMapper } from '../mappers/prisma-delivery-people-mapper';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/domain/auth/application/repositories/user-repository';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUserRepository
  implements UserRepository
{
  constructor(private prisma: PrismaService) {}
  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { cpf, },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(user: Partial<User>): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
}
