import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Movie } from '../../movie/entities/movie.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Movie, (movie) => movie.user, { cascade: ['remove'] })
  movies: Movie[];
}
