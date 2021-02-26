import { IsEmail, Length, Min } from "class-validator";
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

import Entity from "./Entity";
import { Movie } from "./Movie";

@TOEntity("languages")
export class Language extends Entity {
  constructor(language: Partial<Language>) {
    super();
    Object.assign(this, language);
  }
  @Column()
  title: string;

  @OneToMany((type) => Movie, (movie) => movie.language)
  movies: Movie[];
}
