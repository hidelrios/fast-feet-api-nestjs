import { User } from "@/domain/user/enterprise/entities/user";

export class DeliveryPeoplePresenter {
  static toHTTP(deliveryPerson: User) {  
    return {
      id: deliveryPerson.id.toString(),
      name: deliveryPerson.name,
      cpf: deliveryPerson.cpf,
      role: deliveryPerson.role,
      createdAt: deliveryPerson.createdAt,
      updatedAt: deliveryPerson.updatedAt,
    };
  }
}