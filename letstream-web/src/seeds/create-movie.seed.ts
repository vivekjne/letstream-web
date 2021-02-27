import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { Language } from "../entities/Language";
import { Movie } from "../entities/Movie";

export default class CreateMovie implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const languages = await Language.find();

    await factory(Movie)()
      .map(async (movie: Movie) => {
        movie.language =
          languages[Math.floor(Math.random() * languages.length)];
        return movie;
      })
      .createMany(20);
  }
}
