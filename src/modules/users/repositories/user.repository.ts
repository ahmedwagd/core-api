import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {

    return await this.prisma.user.create({
      data: createUserDto
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOne(userId: number) {
    console.log('userId', userId);
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        email: true,
        password: true,
        social_id: true,
        license: true,
        is_verified: true,
        // hashedRefreshToken: true,
        gender: true,
        created_at: true,
        updated_at: true,
        deleted_at: true,
        clinicId: true
      },
      include: {
        schedule: true
      }
    });
  }

  async updateHashedRefreshToken(userId: number, hashedRT: string | null) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRT,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        role: true,
        // Exclude sensitive information
      }
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto
    });
  }

  async delete(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId }
    });
  }

  async updateUserRole(userId: number, newRole: Role) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });
  }
}
