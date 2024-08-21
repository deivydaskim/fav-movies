import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('movie')
@UseGuards(JwtAuthGuard)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(
    @Body() createMovieDto: CreateMovieDto,
    @GetUser() user: UserCredentials,
  ) {
    return this.movieService.create(createMovieDto, user);
  }

  @Get()
  findAll(@GetUser() user: UserCredentials) {
    return this.movieService.findAll(user);
  }

  @Get('search')
  async searchMovies(@Query('query') query: string, @Req() req: Request) {
    const user = req.user;
    return this.movieService.searchMovies(query, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: UserCredentials) {
    return this.movieService.findOne(+id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @GetUser() user: UserCredentials,
  ) {
    return this.movieService.update(+id, updateMovieDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: UserCredentials) {
    return this.movieService.remove(+id, user);
  }
}
