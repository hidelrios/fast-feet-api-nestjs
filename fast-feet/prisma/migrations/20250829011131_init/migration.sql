-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'DELIVERYMAN') NOT NULL DEFAULT 'DELIVERYMAN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipient` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `complement` VARCHAR(191) NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveryId` VARCHAR(191) NOT NULL,
    `recipientId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delivery` (
    `id` VARCHAR(191) NOT NULL,
    `product` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'WITHDRAWN', 'DELIVERED', 'RETURNED') NOT NULL DEFAULT 'PENDING',
    `photoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `recipientId` VARCHAR(191) NOT NULL,
    `deliverymanId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_deliveryId_fkey` FOREIGN KEY (`deliveryId`) REFERENCES `Delivery`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `Recipient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Delivery` ADD CONSTRAINT `Delivery_deliverymanId_fkey` FOREIGN KEY (`deliverymanId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
