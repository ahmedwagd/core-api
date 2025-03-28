import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles/roles.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard, // This should be applied first
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard, // This should be applied second
  },],
})
export class AppModule {}
