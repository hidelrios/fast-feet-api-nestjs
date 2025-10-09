import { Recipient } from "../../enterprise/entities/recipient";

export abstract class RecipientRepository {
  abstract create(data: Recipient): Promise<void>;
  abstract findById(id: string): Promise<any | null>;
  abstract findAll(): Promise<any[]>;
  abstract update(data: Partial<Recipient>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}