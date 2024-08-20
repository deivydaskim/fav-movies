import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info) {
    if (err || info || !user) {
      throw err || info || new UnauthorizedException('SOMETHING WENT WRONG');
    }
    return user;
  }
}
