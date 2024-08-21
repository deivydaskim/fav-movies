import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  // authDto for validating incoming data. should be better solution?
  async(@Body() authDto: AuthDto, @Request() req: Request) {
    return this.authService.login(req.user);
  }
}
