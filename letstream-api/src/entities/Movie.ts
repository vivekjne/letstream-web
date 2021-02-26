import { IsEmail, Length, Min } from "class-validator";
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

import Entity from "./Entity";
import { MovieVideo } from "./MovieVideo";
import { Language } from "./Language";

@TOEntity("movies")
export class Movie extends Entity {
  constructor(movie: Partial<Movie>) {
    super();
    Object.assign(this, movie);
  }
  @Column()
  title: string;

  @Column({ nullable: true })
  poster: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne((type) => Language, (language) => language.movies)
  language: Language;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: "date", nullable: true })
  releaseDate: Date;

  @Column({ nullable: true })
  trailerLink: string;

  @OneToMany((type) => MovieVideo, (movieVideo) => movieVideo.movie)
  videos: MovieVideo[];
}
