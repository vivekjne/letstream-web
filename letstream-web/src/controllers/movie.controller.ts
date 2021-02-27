import { isEmpty, validate } from "class-validator";
import { Response, Request } from "express";
import {
  LessThan,
  MoreThan,
  MoreThanOrEqual,
  Equal,
  LessThanOrEqual,
  Like,
} from "typeorm";
import { Movie } from "../entities/Movie";

const modifyMovieResult = (data: Movie[] | Movie) => {
  if (Array.isArray(data)) {
    return data.map((movie: Movie) => {
      delete movie.language.createdAt;
      delete movie.language.updatedAt;
      return movie;
    });
  } else {
    delete data.language.createdAt;
    delete data.language.updatedAt;
    return data;
  }
};

const getMovies = async (req: Request, res: Response) => {
  try {
    const page: number = req.query.page && parseInt(req.query.page as string);
    const pageSize =
      (req.query.pageSize && parseInt(req.query.pageSize as string)) || 10;
    const moviesCount = await Movie.count();
    let queryParams: any = {};

    queryParams.take = pageSize;
    queryParams.skip = pageSize * (page - 1);
    queryParams.conditions = {};
    queryParams.order = {};
    queryParams.where = {};
    const conditionFields = {
      $eq$: Equal,
      $lt$: LessThan,
      $gt$: MoreThan,
      $lte$: LessThanOrEqual,
      $gte$: MoreThanOrEqual,
      $like$: Like,
    };
    if (req.query.conditions) {
      let test: any = {};
      const conditions = req.query.conditions as string;
      conditions.split(",").forEach((condition) => {
        Object.keys(conditionFields).forEach((conditionKey) => {
          if (condition.includes(conditionKey)) {
            const [key, value] = condition.split(conditionKey);
            queryParams.where[key] = conditionFields[conditionKey](value);
          }
        });
      });
    }

    if (req.query.viewsOrder) {
      queryParams.order.views = req.query.viewsOrder;
    }

    const movies = await Movie.find(queryParams);
    return res.status(200).json({
      movies: modifyMovieResult(movies),
      count: moviesCount,
      results: movies.length,
      query: queryParams,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

const getMovie = async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findOne(req.params.id);

    return res.status(200).json({ movie: modifyMovieResult(movie) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

const getMovieByLanguageIds = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find({
      where: { language: req.params.languageId },
    });
    return res.status(200).json({ movies: modifyMovieResult(movies) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

export { getMovies, getMovie, getMovieByLanguageIds };
