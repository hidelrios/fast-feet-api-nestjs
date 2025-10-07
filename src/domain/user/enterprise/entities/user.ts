import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Role } from '@prisma/client';

interface UserProps {
  name: string;
  cpf: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class User extends Entity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return user;
  }

  update(
    props: Partial<UserProps>,
  ) {
    Object.assign(this.props, props);
    this.props.updatedAt = new Date();
  }

  get name() {
    return this.props.name;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
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
