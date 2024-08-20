import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(authDto: AuthDto) {
    const { username, password } = authDto;

    const existingUser = await this.userService.getUser(username);

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser(username, hashedPassword);

    return plainToInstance(UserDto, newUser); // Return user without sensitive data
  }

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

  async login(user: UserCredentials) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
