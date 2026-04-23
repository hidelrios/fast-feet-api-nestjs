import { User } from '../../enterprise/entities/user';

export abstract class DeliveryPeopleRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByCpf(cpf: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract findAll(): Promise<User[]>;
  abstract update(user: Partial<User>): Promise<void>;
  abstract delete(userId: string): Promise<void>;
}
