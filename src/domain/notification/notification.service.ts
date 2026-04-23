export class NotificationService {
  async send({
    to,
    message,
  }: {
    to: string;
    message: string;
  }) {
    console.log(`📩 Notificação para ${to}: ${message}`);
  }
}