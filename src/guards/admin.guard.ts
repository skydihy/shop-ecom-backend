import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from '@/constants';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) {
      return false;
    }

    return (
      request.currentUser.role === UserRole.ADMIN ||
      request.currentUser.role === UserRole.SUPER_ADMIN
    );
  }
}
