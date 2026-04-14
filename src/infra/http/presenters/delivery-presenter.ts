import { Delivery } from "@/domain/delivery/enterprise/entities/delivery";

export class DeliveryPresenter {
  static toHttp(delivery: Delivery) {
    return {
      id: delivery.id.toString(),
      product: delivery.product,
      status: delivery.status,
      photoUrl: delivery.photoUrl,
      createdAt: delivery.createdAt,
      updatedAt: delivery.updatedAt,
      deletedAt: delivery.deletedAt,
    };
  }
}