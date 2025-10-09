import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';


interface RecipientProps {
  name: string;
  street: string;
  number: string;
  complement?: string;
  state: string;
  city: string;
  zipCode: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Recipient extends Entity<RecipientProps> {
  static create(props: Optional<RecipientProps, 'createdAt'>, id?: UniqueEntityID) {
    const recipient = new Recipient(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return recipient;
  }

  update(
    props: Partial<RecipientProps>,
  ) {
    Object.assign(this.props, props);
    this.props.updatedAt = new Date();
  }

  get name() {
    return this.props.name;
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get complement() {
    return this.props.complement;
  }

  get state() {
    return this.props.state;
  }
  
  get city() {
    return this.props.city;
  }

  get zipCode() {
    return this.props.zipCode;
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
