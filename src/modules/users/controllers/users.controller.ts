import {
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
import { UsersService } from '../services/users.service';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Role } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: Role;
    primary_clinic_id
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Public endpoint for admin to create users
  @Public()
  @Roles('ADMIN')
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Get all users (admin only)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
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
  @Roles('ADMIN')
  @Patch(':id/role')
  async changeUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: Role
  ) {
    return this.usersService.changeUserRole(id, role);
  }

  // Delete user account (admin or self)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
}
