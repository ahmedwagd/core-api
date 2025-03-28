import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly _userRepository: UserRepository,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;

    if (!password) throw new BadRequestException('');

    const hashedPassword = await hash(password);

    const newUser = { password: hashedPassword, ...user }

    return await this._userRepository.create(newUser);
  }

  async findByEmail(email: string) {
    return await this._userRepository.findByEmail(email);
  }

  async findOne(userId: number) {
    return await this._userRepository.findOne(userId);
  }

  async updateHashedRefreshToken(userId: number, hashedRT: string | null) {
    return await this._userRepository.updateHashedRefreshToken(userId, hashedRT);
  }
}
