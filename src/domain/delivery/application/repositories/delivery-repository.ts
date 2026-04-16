import { Delivery } from '../../enterprise/entities/delivery';

export abstract class DeliveryRepository {
  abstract create(data: Delivery): Promise<void>;
  abstract findById(id: string): Promise<Delivery | null>;
  abstract findAll(): Promise<Delivery[]>;
  abstract update(data: Partial<Delivery>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
