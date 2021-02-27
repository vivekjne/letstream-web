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
import { EpisodeVideo } from "./EpisodeVideo";

@TOEntity("episodes")
export class Episode extends Entity {
  constructor(episode: Partial<Episode>) {
    super();
    Object.assign(this, episode);
  }
  @Column()
  title: string;

  @Column({ nullable: true })
  poster: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  episodeNumber: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: "date", nullable: true })
  airDate: Date;

  @ManyToOne((type) => Season, (season) => season.episodes)
  season: Season;

  @OneToMany((type) => EpisodeVideo, (episodeVideo) => episodeVideo.episode)
  videos: EpisodeVideo[];
}
