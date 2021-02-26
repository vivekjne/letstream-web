import { IsEmail, Length, Min } from "class-validator";
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

import Entity from "./Entity";
import { Movie } from "./Movie";

@TOEntity("movie_videos")
export class MovieVideo extends Entity {
  constructor(movieVideo: Partial<MovieVideo>) {
    super();
    Object.assign(this, movieVideo);
  }
  @Column()
  link: string;

  @Column()
  quality: string;

  @Column({ default: 1 })
  status: number;

  @ManyToOne((type) => Movie, (movie) => movie.videos)
  movie: Movie;
}
