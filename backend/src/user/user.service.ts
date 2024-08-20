import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(username: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { username },
    });

    return user;
  }

  async createUser(username: string, password: string) {
    const user = this.userRepository.create({
      username,
      password,
    });

    await this.userRepository.save(user);

    return user;
  }
}
