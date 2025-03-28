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
    private configService: ConfigService,
    private authService: AuthService,
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    const userId = payload.sub;
    console.log('JWT Payload:', payload);
    return this.authService.validateJwtUser(userId);
  }
}
