import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  validate(email: string, password: string) {
    if (!email || !email.trim())
      throw new UnauthorizedException('Please provide a valid email address');

    if (!password || !password.trim())
      throw new UnauthorizedException('Please provide your password');

    if (password === '')
      throw new UnauthorizedException('Please provide your password!');

    return this.authService.validateLocalUser(email, password);
  }
}
