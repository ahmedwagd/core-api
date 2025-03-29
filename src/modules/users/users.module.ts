import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserRepository],
  imports: [PrismaModule],
  exports: [UsersService],
})
export class UsersModule { }
