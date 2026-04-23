import { Recipient } from '../../enterprise/entities/recipient';

export abstract class RecipientRepository {
  abstract create(data: Recipient): Promise<void>;
  abstract findById(id: string): Promise<Recipient | null>;
  abstract findAll(): Promise<Recipient[]>;
  abstract update(data: Partial<Recipient>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
