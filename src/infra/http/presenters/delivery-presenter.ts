import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";

export class DeliveryPresenter {
  static toHttp(delivery: Delivery) {
    return {
      id: delivery.id.toString(),
      status: delivery.status,
      photoUrl: delivery.photoUrl,
      recipientId: delivery.recipientId,
      deliverymanId: delivery.deliverymanId,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
      deletedAt: delivery.deletedAt,
    };
  }
}