import { SetMetadata } from '@nestjs/common';
import { AUTH_CONSTANTS } from 'src/common/constants/constants';

export const Public = () => SetMetadata(AUTH_CONSTANTS.IS_PUBLIC_KEY, true);
