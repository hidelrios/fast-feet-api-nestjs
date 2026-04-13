import { Recipient } from "@/domain/delivery/enterprise/entities/recipient";

export class RecipientPresenter {
  static toHTTP(recipient: Recipient) {  
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      street: recipient.street,
      number: recipient.number,
      complement: recipient.complement,
      state: recipient.state,
      longitude: recipient.longitude,
      latitude: recipient.latitude,
      zipCode: recipient.zipCode,
      createdAt: recipient.createdAt,
      updatedAt: recipient.updatedAt,
    };
  }
}