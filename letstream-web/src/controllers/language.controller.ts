import { isEmpty, validate } from "class-validator";
import { Response, Request } from "express";
import { Language } from "../entities/Language";

const getLanguages = async (req: Request, res: Response) => {
  try {
    const languages = await Language.find();
    return res
      .status(200)
      .json({ languages: languages, count: languages.length });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

const getLanguage = async (req: Request, res: Response) => {
  try {
    const language = await Language.findOne(req.params.id);
    return res.status(200).json({ language });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

const createLanguage = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    let errors: any = {};

    if (isEmpty(title)) errors.title = "Title must not be empty";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
    const languageExists = await Language.findOne({
      title: title.toLowerCase().trim(),
    });
    if (languageExists) {
      return res
        .status(400)
        .json({ message: `Language ${title} already exists` });
    }
    const language = await Language.create({ title });
    errors = await validate(language);
    console.log(errors);
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }
    await language.save();

    return res.status(201).json({ language });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

const updateLanguage = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    let errors: any = {};

    if (isEmpty(title)) errors.title = "Title must not be empty";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const language = await Language.findOne(req.params.id);
    if (language) {
      language.title = title;
      await language.save();
      return res.status(200).json({ language });
    }

    return res
      .status(404)
      .json({ message: `Language with id ${req.params.id} not found!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

const deleteLanguage = async (req: Request, res: Response) => {
  try {
    const language = await Language.findOne(req.params.id);
    if (language) {
      await language.remove();
      return res.status(204).json({ success: true });
    }

    return res
      .status(404)
      .json({ message: `Language with id ${req.params.id} not found!` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err, success: false });
  }
};

export {
  getLanguages,
  getLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};
