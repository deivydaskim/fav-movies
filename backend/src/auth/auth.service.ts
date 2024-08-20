import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserCredentials> {
    const user = await this.userService.getUser(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, username: user.username };
    }
    return null;
  }
}
