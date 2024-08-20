import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @Exclude()
  password: string;
}
