import { User } from '../../enterprise/entities/user';

export abstract class DeliveryPeopleRepository {
  abstract findById(id: string): Promise<boolean>;
  abstract findByCpf(cpf: string): Promise<boolean>;
  abstract create(user: User): Promise<void>;
}
