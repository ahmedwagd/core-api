import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { PatientsModule } from 'src/modules/patients/patients.module';
import { UsersModule } from 'src/modules/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClinicModule } from 'src/modules/clinic/clinic.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    PatientsModule,
    ClinicModule,
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
export class AppModule { }
