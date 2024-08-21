import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  releaseDate: Date;

  @ManyToOne(() => User, (user) => user.movies, { onDelete: 'CASCADE' })
  @Exclude() // Exclude user data when object is serialized
  user: User;
}
