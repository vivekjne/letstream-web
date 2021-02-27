import { Request, Response, Router } from "express";
import {
  createLanguage,
  getLanguage,
  getLanguages,
  updateLanguage,
  deleteLanguage,
} from "../controllers/language.controller";

const router = Router({ mergeParams: true });

router.route("/").get(getLanguages).post(createLanguage);

router
  .route("/:id")
  .get(getLanguage)
  .put(updateLanguage)
  .delete(deleteLanguage);

export default router;
