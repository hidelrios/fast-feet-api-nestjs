import { Either, left, right } from "@/core/either";
import { UserRepository } from "../repositories/user-repository";
import { UserNotExistsError } from "./erros/user-not-exists-error";
import { HashComparer } from "@/domain/user/application/cryptography/hash-comparer";
import { AuthenticationError } from "./erros/authentication-error";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

type AuthenticationUseCaseResponse = Either<
  UserNotExistsError |
  AuthenticationError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class AuthenticationUseCase {
  constructor(
    private readonly useRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly jwtService: JwtService
  ) { }

  async execute(cpf: string, password: string): Promise<AuthenticationUseCaseResponse> {
    const user = await this.useRepository.findByCpf(cpf);

    if (!user) {
      return left(new UserNotExistsError(cpf));
    }

    const checkPassword =  this.hashComparer.compare(password, user.password);

    if (!checkPassword) {
      return left(new AuthenticationError());
    }
    const token = await this.jwtService.signAsync(
      {
        sub: user.id.toValue(),
        role: user.role,
      },
    );
    return right({ accessToken: token });
  }
}