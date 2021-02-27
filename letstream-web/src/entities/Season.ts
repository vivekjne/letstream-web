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
import { Serial } from "./Serial";
import { Episode } from "./Episode";

@TOEntity("seasons")
export class Season extends Entity {
  constructor(season: Partial<Season>) {
    super();
    Object.assign(this, season);
  }
  @Column()
  title: string;

  @Column()
  seasonNumber: number;

  @Column({ nullable: true })
  poster: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: "date", nullable: true })
  airDate: Date;

  @Column({ nullable: true })
  trailerLink: string;

  @ManyToOne((type) => Serial, (serial) => serial.seasons)
  serial: Serial;

  @OneToMany((type) => Episode, (episode) => episode.season)
  episodes: Episode[];
}
