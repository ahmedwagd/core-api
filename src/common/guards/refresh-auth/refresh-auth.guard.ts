import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_CONSTANTS } from 'src/common/constants/constants';

@Injectable()
export class RefreshAuthGuard extends AuthGuard(AUTH_CONSTANTS.STRATEGIES.REFRESH) { }
