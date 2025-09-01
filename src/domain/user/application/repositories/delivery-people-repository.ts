import { User } from '../../enterprise/entities/user';

export abstract class DeliveryPeopleRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByCpf(cpf: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
}
