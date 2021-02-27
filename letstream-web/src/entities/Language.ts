import { IsEmail, Length, Min } from "class-validator";
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

import Entity from "./Entity";
import { Movie } from "./Movie";
import { Serial } from "./Serial";

@TOEntity("languages")
export class Language extends Entity {
  constructor(language: Partial<Language>) {
    super();
    Object.assign(this, language);
  }

  @Index()
  @Column({ unique: true })
  title: string;

  @OneToMany((type) => Movie, (movie) => movie.language)
  movies: Movie[];

  @OneToMany((type) => Serial, (serial) => serial.language)
  series: Serial[];

  @BeforeInsert()
  @BeforeUpdate()
  async lowerCasePassword() {
    this.title = this.title.toLowerCase().trim();
  }
}
