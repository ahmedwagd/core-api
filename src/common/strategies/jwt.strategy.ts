import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/services/auth.service';
import type { AuthJwtPayload } from '../types/auth-jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @Inject(jwtConfig.KEY)
    // private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthJwtPayload) {
    const userId = payload.sub;
    console.log('JWT Payload:', payload);
    return await this.authService.validateJwtUser(userId);
  }
}
