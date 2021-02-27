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
import { Episode } from "./Episode";

@TOEntity("episode_videos")
export class EpisodeVideo extends Entity {
  constructor(episodeVideo: Partial<EpisodeVideo>) {
    super();
    Object.assign(this, episodeVideo);
  }
  @Column()
  link: string;

  @Column()
  quality: string;

  @Column({ default: 1 })
  status: number;

  @ManyToOne((type) => Episode, (episode) => episode.videos)
  episode: Episode;
}
