import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { SchedulesService } from '../services/schedules.service';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: Role;
    primary_clinic_id
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly schedulesService: SchedulesService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Get all users (admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  // Get user profile (authenticated users)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req: AuthenticatedRequest) {
    return this.usersService.findOne(req.user.id);
  }

  // Update user profile (authenticated users)
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateUserProfile(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  // Change user role (admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Patch(':id/role')
  async changeUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: Role
  ) {
    return this.usersService.changeUserRole(id, role);
  }

  // Delete user account (admin or self)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Delete(':id')
  async deleteUser(
    @Request() req: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number
  ) {
    // Check if user is deleting themselves or is an admin
    if (req.user.role !== 'ADMIN' && req.user.id !== id) {
      throw new ForbiddenException('You are not authorized to delete this user');
    }
    return this.usersService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Post(':id/schedule')
  async createDoctorSchedule(
    @Param('id', ParseIntPipe) doctorId: number,
    @Body() createScheduleDto: CreateScheduleDto
  ) {
    // Add null check and explicit type
    const user = await this.usersService.findOne(doctorId);

    if (!user || user.role !== 'DOCTOR') {
      throw new BadRequestException('Invalid doctor or not a doctor');
    }

    return this.schedulesService.create({
      ...createScheduleDto,
      user_id: doctorId // Match DTO field name
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @Patch(':id/schedule')
  async updateDoctorSchedule(
    @Param('id', ParseIntPipe) doctorId: number,
    @Body() updateScheduleDto: UpdateScheduleDto
  ) {
    // Verify the user is a doctor
    const user = await this.usersService.findOne(doctorId);
    if (!user || user.role !== 'DOCTOR') {
      throw new BadRequestException('Invalid doctor or not a doctor');
    }

    return this.schedulesService.update(doctorId, updateScheduleDto);
  }
}
