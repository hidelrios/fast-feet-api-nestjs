import { Delivery } from "../../enterprise/entities/delivery";

export abstract class DeliveryRepository {
  abstract create(data: Delivery): Promise<void>;
  abstract findById(id: string): Promise<any | null>;
  abstract findAll(): Promise<any[]>;
  abstract update(data: Partial<Delivery>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}