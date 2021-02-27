import Faker from "faker";
import { define } from "typeorm-seeding";
import { Language } from "../entities/Language";
import { Movie } from "../entities/Movie";

define(Movie, (faker: typeof Faker) => {
  const gender = faker.random.number(1);

  const movie = new Movie({
    title: faker.name.firstName(1),
    views: faker.random.number(100),

    poster: faker.image.people(300, 300),
    description: faker.lorem.paragraph(2),
    status: 1,
    releaseDate: faker.date.past(20),
    trailerLink: "https://www.youtube.com/watch?v=NYH2sLid0Zc",
  });

  return movie;
});
