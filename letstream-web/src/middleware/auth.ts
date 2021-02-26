import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../entities/User";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRepository = getRepository(User);
    const bearerToken = req.headers.authorization;
    console.log(bearerToken);
    const token =
      (bearerToken && bearerToken.replace("Bearer ", "")) || req.cookies.token;
    if (!token) throw new Error("Unauthenticated");

    const { id }: any = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userRepository.findOne(id);

    if (!user) throw new Error("Unauthenticated");
    res.locals.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthenticated" });
  }
};
