// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role } from '@prisma/client';
// import { Observable } from 'rxjs';
// import { ROLES_KEY } from 'src/common/constants/constants';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) { }
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) return true;

//     const { user } = context.switchToHttp().getRequest<{ user: { role: Role } }>();

//     const hasRequiredRole = requiredRoles.some((role) => user.role === role);
//     return hasRequiredRole;
//   }
// }
// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true; // No roles required, allow access
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Add this null check to prevent the error
    if (!user) {
      return false; // No user found, deny access
    }
    
    return requiredRoles.some((role) => user.role === role);
  }
}