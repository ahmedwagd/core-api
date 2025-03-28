import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {

    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        primary_clinic_id: 1
      }
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
    return this.prisma.user.findMany({
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
    return this.prisma.user.update({
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
