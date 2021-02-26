import { IsEmail, Length, Min } from "class-validator";
import { Entity as TOEntity, Column, Index, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

import Entity from "./Entity";

@TOEntity("genres")
export class Genre extends Entity {
  constructor(genre: Partial<Genre>) {
    super();
    Object.assign(this, genre);
  }
  @Column()
  name: string;
}
