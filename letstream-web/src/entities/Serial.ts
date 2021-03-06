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
import { Season } from "./Season";

@TOEntity("series")
export class Serial extends Entity {
  constructor(serial: Partial<Serial>) {
    super();
    Object.assign(this, serial);
  }
  @Column()
  title: string;

  @Column({ nullable: true })
  poster: string;

  @Column({ type: "text" })
  description: string;

  @ManyToOne((type) => Language, (language) => language.series)
  language: Language;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: "date", nullable: true })
  firstAirDate: Date;

  @Column({ type: "date", nullable: true })
  lastAirDate: Date;

  @Column({ default: false })
  ongoing: Boolean;

  @OneToMany((type) => Season, (season) => season.serial)
  seasons: Season[];
}
