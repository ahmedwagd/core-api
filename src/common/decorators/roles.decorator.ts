import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AUTH_CONSTANTS } from 'src/common/constants/constants';

export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata(AUTH_CONSTANTS.ROLES_KEY, roles);
