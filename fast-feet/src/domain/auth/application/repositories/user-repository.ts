import { User } from "@/domain/user/enterprise/entities/user";

export abstract class UserRepository {
  abstract findByCpf(cpf: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(user: User): Promise<void>;
  abstract update(user: Partial<User>): Promise<void>;
}