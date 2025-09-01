import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { User } from '@/domain/user/enterprise/entities/user';
import { User as PrismaUser, Prisma } from '@prisma/client';

export class PrismaDeliveryPeopleMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        role: raw.role,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    );
  }
  static toPrisma(user: User): Prisma.UserCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      cpf: user.cpf,
      role: user.role,
      password: user.password,
    };
  }
}
