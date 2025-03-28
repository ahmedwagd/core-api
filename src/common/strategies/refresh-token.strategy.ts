import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/services/auth.service';
import type { AuthJwtPayload } from '../../common/types/auth-jwtPayload';
import refreshConfig from '../../config/refresh.config';

interface RefreshRequest extends Request {
  body: { refresh: string }; // Define the expected body structure
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      secretOrKey: refreshTokenConfig.secret!,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  // request.user
  validate(req: RefreshRequest, payload: AuthJwtPayload) {
    console.log('Re JWT Payload:', payload);
    const userId = payload.sub;
    const refreshToken = req.body.refresh;

    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
