import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../../common/guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from '../../common/guards/refresh-auth/refresh-auth.guard';
// import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Role } from '@prisma/client';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

// Define user and request types
interface AuthenticatedUser {
  id: number;
  name: string;
  role: Role;
}

interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user.id, req.user.name, req.user.role);
  }
  
  @Public()
  @Get('protected')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  getAll(@Request() req: AuthenticatedRequest) {
    return {
      messege: `Now you can access this protected API. this is your user ID: ${req.user.id}`,
    };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req: AuthenticatedRequest) {
    return this.authService.refreshToken(req.user.id, req.user.name);
  }

  @Public()
  @Post('signout')
  // @UseGuards(JwtAuthGuard)
  signOut(@Req() req: AuthenticatedRequest) {
    return this.authService.signOut(req.user.id);
  }

  /*
    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin() {}
  
    @Public()
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Request() req, @Res() res: Response) {
      // console.log('Google User', req.user);
      const resopnse = await this.authService.login(
        req.user.id,
        req.user.name,
        req.user.role,
      );
      res.redirect(
        `http://localhost:3000/api/auth/google/callback?userId=${resopnse.id}&name=${resopnse.name}&accessToken=${resopnse.accessToken}&refreshToken=${resopnse.refreshToken}&role=${resopnse.role}`,
      );
    }
  */
}
