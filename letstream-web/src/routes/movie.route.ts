import { Request, Response, Router } from "express";
import {
  getMovie,
  getMovieByLanguageIds,
  getMovies,
} from "../controllers/movie.controller";

const router = Router({ mergeParams: true });

router.route("/").get(getMovies);

router.route("/:id").get(getMovie);

router.route("/language/:languageId").get(getMovieByLanguageIds);

export default router;
