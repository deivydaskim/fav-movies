import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository, Like } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async create(
    createMovieDto: CreateMovieDto,
    user: UserCredentials,
  ): Promise<any> {
    const movie = this.movieRepository.create({
      ...createMovieDto,
      user,
    });

    const savedMovie = await this.movieRepository.save(movie);

    // Returning movie excluding user data (@Exclude in Movie entity)
    return instanceToPlain(savedMovie);
  }

  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
    user: UserCredentials,
  ): Promise<Movie> {
    await this.findOne(id, user);

    await this.movieRepository.update(id, updateMovieDto);

    return this.findOne(id, user);
  }

  async remove(id: number, user: UserCredentials): Promise<void> {
    const movie = await this.findOne(id, user);
    await this.movieRepository.remove(movie);
  }

  async findOne(id: number, user: UserCredentials): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id, user } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  async findAll(user: UserCredentials): Promise<Movie[]> {
    return this.movieRepository.find({ where: { user } });
  }

  async searchMovies(query: string, user: UserCredentials): Promise<Movie[]> {
    return this.movieRepository.find({
      where: {
        user,
        title: Like(`%${query}%`),
      },
    });
  }
}
