import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export enum DeliveryStatus {
  PENDING = 'PENDING',
  WITHDRAWN = 'WITHDRAWN',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
}

interface DeliveryProps {
  product: string;
  status: DeliveryStatus;
  photoUrl?: string;
  recipientId: string;
  deliverymanId: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Delivery extends Entity<DeliveryProps> {
  static create(props: Optional<DeliveryProps, 'createdAt'>, id?: UniqueEntityID) {
    const delivery = new Delivery(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return delivery;
  }

  update(
    props: Partial<DeliveryProps>,
  ) {
    Object.assign(this.props, props);
    this.props.updatedAt = new Date();
  }

  get product() {
    return this.props.product;
  }

  get status() {
    return this.props.status;
  }

  get photoUrl() {
    return this.props.photoUrl;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get deliverymanId() {
    return this.props.deliverymanId;
  }
  
  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }
}
