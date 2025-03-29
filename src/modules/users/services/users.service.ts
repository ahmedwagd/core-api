import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { hash } from 'argon2';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

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

  async findAll() {
    // Implement method to fetch all users (potentially with pagination)
    return this._userRepository.findAll();
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    // Implement user update logic
    return this._userRepository.update(userId, updateUserDto);
  }

  async delete(userId: number) {
    // Implement user deletion logic
    return this._userRepository.delete(userId);
  }

  async changeUserRole(userId: number, newRole: Role) {
    // Implement role change logic
    return this._userRepository.updateUserRole(userId, newRole);
  }
}
