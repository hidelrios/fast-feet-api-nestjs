import { HashComparer } from "@/domain/user/application/cryptography/hash-comparer";
import { UserRepository } from "../repositories/user-repository";
import { HashGenerator } from "@/domain/user/application/cryptography/hash-generator";
import { Injectable } from "@nestjs/common";
import { Either, left, right } from "@/core/either";
import { UserNotExistsError } from "./erros/user-not-exists-error";
import { ChangePasswordError } from "./erros/change-password-error";

type ChangePasswordUseCaseResponse = Either<
  UserNotExistsError |
  ChangePasswordError,
  {
    message: string;
  }
>;

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<ChangePasswordUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return left(new UserNotExistsError(userId));
    }

    const isCurrentPasswordValid = await this.hashComparer.compare(
      currentPassword,
      user.password,
    );
    
    if (!isCurrentPasswordValid) {
      return left(new ChangePasswordError('Current password is incorrect.'));
    }
    try{
      const hashedNewPassword = await this.hashGenerator.hash(newPassword);
      user.update({ password: hashedNewPassword });
      await this.userRepository.update(user);

      return right({ message: 'Password changed successfully.' });
    }
    catch (error) {
      return left(new ChangePasswordError(error.message));
    }
  }

}